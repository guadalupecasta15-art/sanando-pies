import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { Boxes, AlertTriangle, PackageCheck } from "lucide-react";
import { getProductsList } from "@/features/products/queries";

export const metadata: Metadata = { title: "Inventario" };

export default async function InventarioPage() {
  const products = await getProductsList();
  const lowStock = products.filter((p) => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary-900">Inventario</h1>
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard icon={Boxes} label="SKUs activos" value={products.length.toString()} />
        <StatCard icon={AlertTriangle} label="Bajo inventario" value={lowStock.length.toString()} />
        <StatCard icon={PackageCheck} label="Existencias totales" value={products.reduce((a, p) => a + p.stock, 0).toString()} />
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Producto</th>
                <th className="px-5 py-3.5 font-semibold">Existencias</th>
                <th className="px-5 py-3.5 font-semibold">Mínimo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-sm text-primary-400">
                    No hay productos registrados todavía.
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-4 font-medium text-primary-900">{p.name}</td>
                  <td className="px-5 py-4 text-primary-500">{p.stock}</td>
                  <td className="px-5 py-4 text-primary-500">{p.minStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}