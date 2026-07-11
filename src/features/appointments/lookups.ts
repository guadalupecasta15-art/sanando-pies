import { createClient } from "@/lib/supabase/server";

export interface LookupOption {
  id: string;
  label: string;
}

export async function getAppointmentFormOptions() {
  const supabase = await createClient();

  const [patientsRes, specialistsRes, servicesRes, roomsRes] = await Promise.all([
    supabase.from("patients").select("id, full_name").is("archived_at", null).order("full_name"),
    supabase.from("specialists").select("id, full_name").eq("active", true).order("full_name"),
    supabase.from("services").select("id, name, duration_minutes").eq("active", true).order("name"),
    supabase.from("rooms").select("id, name").eq("active", true).order("name"),
  ]);

  const patients: LookupOption[] = (patientsRes.data ?? []).map((p) => ({ id: p.id, label: p.full_name }));
  const specialists: LookupOption[] = (specialistsRes.data ?? []).map((s) => ({ id: s.id, label: s.full_name }));
  const services = (servicesRes.data ?? []).map((s) => ({
    id: s.id,
    label: s.name,
    durationMinutes: s.duration_minutes,
  }));
  const rooms: LookupOption[] = (roomsRes.data ?? []).map((r) => ({ id: r.id, label: r.name }));

  return { patients, specialists, services, rooms };
}