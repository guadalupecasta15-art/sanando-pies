import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { NewServiceDialog } from "@/components/admin/new-service-dialog";
import { getServicesList } from "@/features/services/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Servicios" };

export default async function ServiciosAdminPage() {
  const treatments = await getServicesList();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-primary-900">Servicios</h1>
        <NewServiceDialog />
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Tratamiento</th>
                <th className="px-5 py-3.5 font-semibold">DuraciÃ³n</th>
                <th className="px-5 py-3.5 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {treatments.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-sm text-primary-400">
                    No hay servicios registrados todavÃ­a.
                  </td>
                </tr>
              )}
              {treatments.map((t) => (
                <tr key={t.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-4 font-medium text-primary-900">{t.name}</td>
                  <td className="px-5 py-4 text-primary-500">{t.durationMinutes} min</td>
                  <td className="px-5 py-4 text-primary-500">{formatCurrency(t.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
