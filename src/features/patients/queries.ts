import { createClient } from "@/lib/supabase/server";

export interface PatientListItem {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  lastVisit: string | null;
  totalVisits: number;
  medicalNote: string | null;
}

export async function getPatientsList(): Promise<PatientListItem[]> {
  const supabase = await createClient();

  const [patientsRes, appointmentsRes, recordsRes] = await Promise.all([
    supabase
      .from("patients")
      .select("id, full_name, phone, email")
      .is("archived_at", null)
      .order("full_name", { ascending: true }),
    supabase.from("appointments").select("patient_id, appointment_date"),
    supabase.from("patient_records").select("patient_id, medical_history"),
  ]);

  const visitsByPatient = new Map<string, { count: number; last: string | null }>();
  (appointmentsRes.data ?? []).forEach((a) => {
    const entry = visitsByPatient.get(a.patient_id) ?? { count: 0, last: null };
    entry.count += 1;
    if (!entry.last || a.appointment_date > entry.last) {
      entry.last = a.appointment_date;
    }
    visitsByPatient.set(a.patient_id, entry);
  });

  const notesByPatient = new Map<string, string | null>();
  (recordsRes.data ?? []).forEach((r) => {
    notesByPatient.set(r.patient_id, r.medical_history);
  });

  return (patientsRes.data ?? []).map((p) => {
    const visits = visitsByPatient.get(p.id) ?? { count: 0, last: null };
    return {
      id: p.id,
      fullName: p.full_name,
      phone: p.phone,
      email: p.email,
      lastVisit: visits.last,
      totalVisits: visits.count,
      medicalNote: notesByPatient.get(p.id) ?? null,
    };
  });
}