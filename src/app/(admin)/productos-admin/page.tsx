import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NewProductDialog } from "@/components/admin/new-product-dialog";
import { getProductsList } from "@/features/products/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Productos" };

export default async function ProductosAdminPage() {
  const products = await getProductsList();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-primary-900">Productos</h1>
        <NewProductDialog />
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Producto</th>
                <th className="px-5 py-3.5 font-semibold">Precio</th>
                <th className="px-5 py-3.5 font-semibold">Existencias</th>
                <th className="px-5 py-3.5 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-primary-400">
                    No hay productos registrados todavia.
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-primary-900">{p.name}</p>
                    <p className="text-xs text-primary-400">{p.description}</p>
                  </td>
                  <td className="px-5 py-4 text-primary-500">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-4 text-primary-500">{p.stock} unidades</td>
                  <td className="px-5 py-4">
                    {p.stock <= p.minStock ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        <AlertTriangle className="h-3.5 w-3.5" /> Bajo inventario
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Disponible
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}