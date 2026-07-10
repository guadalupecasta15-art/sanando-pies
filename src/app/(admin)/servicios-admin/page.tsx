import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { treatments } from "@/constants/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Servicios" };

export default function ServiciosAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-primary-900">Servicios</h1>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Tratamiento</th>
                <th className="px-5 py-3.5 font-semibold">Duración</th>
                <th className="px-5 py-3.5 font-semibold">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
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
