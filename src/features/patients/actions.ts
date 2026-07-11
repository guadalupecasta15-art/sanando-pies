"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface PatientFormResult {
  success: boolean;
  message?: string;
}

export async function createPatient(formData: FormData): Promise<PatientFormResult> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const birthDate = String(formData.get("birthDate") ?? "").trim();

  if (!fullName || !phone) {
    return { success: false, message: "Nombre y telefono son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("patients").insert({
    full_name: fullName,
    phone,
    email: email || null,
    birth_date: birthDate || null,
  });

  if (error) {
    return { success: false, message: "No se pudo guardar el paciente. Intenta de nuevo." };
  }

  revalidatePath("/pacientes");
  revalidatePath("/dashboard");

  return { success: true };
}