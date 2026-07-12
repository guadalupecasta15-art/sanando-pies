"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ServiceFormResult {
  success: boolean;
  message?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createService(formData: FormData): Promise<ServiceFormResult> {
  const name = String(formData.get("name") ?? "").trim();
  const durationMinutes = Number(formData.get("durationMinutes") ?? 0);
  const price = Number(formData.get("price") ?? 0);
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !durationMinutes || !price) {
    return { success: false, message: "Nombre, duracion y precio son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("services").insert({
    name,
    slug: slugify(name),
    duration_minutes: durationMinutes,
    price,
    description: description || null,
  });

  if (error) {
    return { success: false, message: "No se pudo guardar el servicio. Intenta de nuevo." };
  }

  revalidatePath("/servicios-admin");
  revalidatePath("/tratamientos");
  return { success: true };
}