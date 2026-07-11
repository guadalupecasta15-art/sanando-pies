import { createClient } from "@/lib/supabase/server";

export interface SpecialistListItem {
  id: string;
  fullName: string;
  specialty: string;
  experienceYears: number;
  photoUrl: string | null;
}

export async function getSpecialistsList(): Promise<SpecialistListItem[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("specialists")
    .select("id, full_name, specialty, experience_years, photo_url")
    .eq("active", true)
    .order("full_name", { ascending: true });

  return (data ?? []).map((s) => ({
    id: s.id,
    fullName: s.full_name,
    specialty: s.specialty,
    experienceYears: s.experience_years,
    photoUrl: s.photo_url,
  }));
}