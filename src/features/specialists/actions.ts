"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SpecialistFormResult {
  success: boolean;
  message?: string;
}

export async function createSpecialist(formData: FormData): Promise<SpecialistFormResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim();
  const experienceYears = Number(formData.get("experienceYears") ?? 0);
  const bio = String(formData.get("bio") ?? "").trim();

  if (!fullName || !specialty) {
    return { success: false, message: "Nombre y especialidad son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("specialists").insert({
    full_name: fullName,
    specialty,
    experience_years: experienceYears || 0,
    bio: bio || null,
  });

  if (error) {
    return { success: false, message: "No se pudo guardar el especialista. Intenta de nuevo." };
  }

  revalidatePath("/especialistas-admin");
  revalidatePath("/especialistas");
  return { success: true };
}