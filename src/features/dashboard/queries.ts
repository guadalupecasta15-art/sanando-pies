import { createClient } from "@/lib/supabase/server";

const MONTH_LABELS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const CHART_COLORS = ["#0B2A4A", "#1E5FA8", "#3E7CB8", "#A6C8EB", "#D2E4F5"];
const MEXICO_TZ = "America/Mexico_City";

function nowInMexico(): Date {
  const mxString = new Date().toLocaleString("en-US", { timeZone: MEXICO_TZ });
  return new Date(mxString);
}

function todayISODate(): string {
  const now = new Date().toLocaleDateString("en-CA", { timeZone: MEXICO_TZ });
  return now;
}

export interface DashboardStats {
  registeredPatients: number;
  patientsThisMonth: number;
  appointmentsToday: number;
  monthlyRevenue: number;
  revenueChangePct: number;
  lowStockProducts: number;
}

export interface DashboardAppointment {
  id: string;
  patientName: string;
  specialistName: string;
  service: string;
  room: string;
  startTime: string;
  endTime: string;
  status: import("@/types/domain").AppointmentStatus;
}

export interface MonthPoint {
  month: string;
  total: number;
}

export interface TreatmentSlice {
  name: string;
  value: number;
  color: string;
}

function getLastNMonths(n: number) {
  const now = nowInMexico();
  const months: { year: number; month: number; label: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth(), label: MONTH_LABELS[d.getMonth()] });
  }
  return months;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const now = nowInMexico();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
  const today = todayISODate();

  const [
    patientsRes,
    patientsThisMonthRes,
    appointmentsTodayRes,
    salesThisMonthRes,
    salesLastMonthRes,
    productsRes,
  ] = await Promise.all([
    supabase.from("patients").select("id", { count: "exact", head: true }).is("archived_at", null),
    supabase.from("patients").select("id", { count: "exact", head: true }).gte("created_at", thisMonthStart),
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("appointment_date", today),
    supabase.from("sales").select("total").gte("created_at", thisMonthStart),
    supabase.from("sales").select("total").gte("created_at", lastMonthStart).lt("created_at", thisMonthStart),
    supabase.from("products").select("stock, min_stock").eq("active", true),
  ]);

  const monthlyRevenue = (salesThisMonthRes.data ?? []).reduce((sum, s) => sum + Number(s.total), 0);
  const lastMonthRevenue = (salesLastMonthRes.data ?? []).reduce((sum, s) => sum + Number(s.total), 0);
  const revenueChangePct =
    lastMonthRevenue > 0 ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) : 0;

  const lowStockProducts = (productsRes.data ?? []).filter((p) => p.stock <= p.min_stock).length;

  return {
    registeredPatients: patientsRes.count ?? 0,
    patientsThisMonth: patientsThisMonthRes.count ?? 0,
    appointmentsToday: appointmentsTodayRes.count ?? 0,
    monthlyRevenue,
    revenueChangePct,
    lowStockProducts,
  };
}

export async function getTodayAppointments(): Promise<DashboardAppointment[]> {
  const supabase = await createClient();
  const today = todayISODate();

  const { data } = await supabase
    .from("appointments")
    .select(
      `
      id,
      start_time,
      end_time,
      status,
      patients ( full_name ),
      specialists ( full_name ),
      services ( name ),
      rooms ( name )
    `
    )
    .eq("appointment_date", today)
    .order("start_time", { ascending: true });

  return (data ?? []).map((a: any) => ({
    id: a.id,
    patientName: a.patients?.full_name ?? "Paciente",
    specialistName: a.specialists?.full_name ?? "Especialista",
    service: a.services?.name ?? "Servicio",
    room: a.rooms?.name ?? "Sala",
    startTime: (a.start_time ?? "").slice(0, 5),
    endTime: (a.end_time ?? "").slice(0, 5),
    status: a.status as import("@/types/domain").AppointmentStatus,
  }));
}

export async function getPatientsByMonth(): Promise<MonthPoint[]> {
  const supabase = await createClient();
  const months = getLastNMonths(5);
  const rangeStart = new Date(months[0].year, months[0].month, 1).toISOString();

  const { data } = await supabase.from("patients").select("created_at").gte("created_at", rangeStart);

  const counts = months.map((m) => ({ month: m.label, total: 0 }));
  (data ?? []).forEach((row) => {
    const d = new Date(row.created_at);
    const idx = months.findIndex((m) => m.year === d.getFullYear() && m.month === d.getMonth());
    if (idx !== -1) counts[idx].total += 1;
  });
  return counts;
}

export async function getRevenueByMonth(): Promise<MonthPoint[]> {
  const supabase = await createClient();
  const months = getLastNMonths(5);
  const rangeStart = new Date(months[0].year, months[0].month, 1).toISOString();

  const { data } = await supabase.from("sales").select("created_at, total").gte("created_at", rangeStart);

  const totals = months.map((m) => ({ month: m.label, total: 0 }));
  (data ?? []).forEach((row) => {
    const d = new Date(row.created_at);
    const idx = months.findIndex((m) => m.year === d.getFullYear() && m.month === d.getMonth());
    if (idx !== -1) totals[idx].total += Number(row.total);
  });
  return totals;
}

export async function getTreatmentDistribution(): Promise<TreatmentSlice[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("appointments").select("services ( name )");

  const counts = new Map<string, number>();
  (data ?? []).forEach((row: any) => {
    const name = row.services?.name ?? "Otro";
    counts.set(name, (counts.get(name) ?? 0) + 1);
  });

  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 4);
  const restTotal = sorted.slice(4).reduce((sum, [, c]) => sum + c, 0);

  const slices: TreatmentSlice[] = top.map(([name, count], i) => ({
    name,
    value: Math.round((count / total) * 100),
    color: CHART_COLORS[i],
  }));

  if (restTotal > 0) {
    slices.push({ name: "Otros", value: Math.round((restTotal / total) * 100), color: CHART_COLORS[4] });
  }

  return slices;
}

export interface FinanceSummary {
  transactionsThisMonth: number;
  averageTicket: number;
}

export async function getFinanceSummary(): Promise<FinanceSummary> {
  const supabase = await createClient();
  const now = nowInMexico();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data } = await supabase.from("sales").select("total").gte("created_at", thisMonthStart);

  const sales = data ?? [];
  const total = sales.reduce((sum, s) => sum + Number(s.total), 0);
  const averageTicket = sales.length > 0 ? Math.round(total / sales.length) : 0;

  return {
    transactionsThisMonth: sales.length,
    averageTicket,
  };
}

export interface AppointmentRequestItem {
  id: string;
  fullName: string;
  phone: string;
  reason: string | null;
  createdAt: string;
}

export async function getPendingAppointmentRequests(): Promise<AppointmentRequestItem[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("appointment_requests")
    .select("id, full_name, phone, reason, created_at, handled")
    .eq("handled", false)
    .order("created_at", { ascending: false });

  return (data ?? []).map((r) => ({
    id: r.id,
    fullName: r.full_name,
    phone: r.phone,
    reason: r.reason,
    createdAt: r.created_at,
  }));
}