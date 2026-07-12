import { createClient } from "@/lib/supabase/server";

export interface ProductListItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  imageUrl: string | null;
  active: boolean;
}

export async function getProductsList(): Promise<ProductListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, description, price, cost, stock, min_stock, image_url, active")
    .order("name", { ascending: true });

  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    cost: p.cost,
    stock: p.stock,
    minStock: p.min_stock,
    imageUrl: p.image_url,
    active: p.active,
  }));
}