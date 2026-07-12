"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProductFormResult {
  success: boolean;
  message?: string;
}

export async function createProduct(formData: FormData): Promise<ProductFormResult> {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const cost = Number(formData.get("cost") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);
  const minStock = Number(formData.get("minStock") ?? 0);
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !price) {
    return { success: false, message: "Nombre y precio son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    name,
    price,
    cost: cost || 0,
    stock: stock || 0,
    min_stock: minStock || 0,
    description: description || null,
  });

  if (error) {
    return { success: false, message: "No se pudo guardar el producto. Intenta de nuevo." };
  }

  revalidatePath("/productos-admin");
  revalidatePath("/productos");
  return { success: true };
}