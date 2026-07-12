import { createClient } from "@/lib/supabase/server";

const MEXICO_TZ = "America/Mexico_City";

export interface AgendaAppointment {
  id: string;
  date: string;
  patientName: string;
  specialistName: string;
  service: string;
  room: string;
  startTime: string;
  endTime: string;
  status: import("@/types/domain").AppointmentStatus;
}

function todayISODate(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: MEXICO_TZ });
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getRangeForView(view: string): { start: string; end: string } {
  const today = todayISODate();
  if (view === "semana") {
    const [y, m, d] = today.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
    const diffToMonday = dow === 0 ? -6 : 1 - dow;
    const start = addDays(today, diffToMonday);
    const end = addDays(start, 6);
    return { start, end };
  }
  if (view === "mes") {
    const [y, m] = today.split("-").map(Number);
    const start = `${y}-${String(m).padStart(2, "0")}-01`;
    const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const end = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return { start, end };
  }
  return { start: today, end: today };
}

export async function getAppointmentsByRange(view: string): Promise<AgendaAppointment[]> {
  const supabase = await createClient();
  const { start, end } = getRangeForView(view);

  const { data } = await supabase
    .from("appointments")
    .select(
      `
      id,
      appointment_date,
      start_time,
      end_time,
      status,
      patients ( full_name ),
      specialists ( full_name ),
      services ( name ),
      rooms ( name )
    `
    )
    .gte("appointment_date", start)
    .lte("appointment_date", end)
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  return (data ?? []).map((a: any) => ({
    id: a.id,
    date: a.appointment_date,
    patientName: a.patients?.full_name ?? "Paciente",
    specialistName: a.specialists?.full_name ?? "Especialista",
    service: a.services?.name ?? "Servicio",
    room: a.rooms?.name ?? "-",
    startTime: a.start_time,
    endTime: a.end_time,
    status: a.status,
  }));
}