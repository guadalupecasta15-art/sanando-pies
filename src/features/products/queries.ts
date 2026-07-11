import { createClient } from "@/lib/supabase/server";

export interface ProductListItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
}

export async function getProductsList(): Promise<ProductListItem[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("id, name, stock, min_stock")
    .eq("active", true)
    .order("name", { ascending: true });

  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    minStock: p.min_stock,
  }));
}