import { createClient } from "@/lib/supabase/server";

export interface ServiceListItem {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export async function getServicesList(): Promise<ServiceListItem[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("services")
    .select("id, name, duration_minutes, price")
    .eq("active", true)
    .order("name", { ascending: true });

  return (data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    durationMinutes: s.duration_minutes,
    price: Number(s.price),
  }));
}