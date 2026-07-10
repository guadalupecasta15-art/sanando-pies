import type { Metadata } from "next";
import { Plus, FolderHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/constants/mock-data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Pacientes" };

export default function PacientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-900">Pacientes</h1>
          <p className="text-sm text-primary-500">{patients.length} pacientes registrados</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo paciente
        </Button>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Paciente</th>
                <th className="px-5 py-3.5 font-semibold">Contacto</th>
                <th className="px-5 py-3.5 font-semibold">Última visita</th>
                <th className="px-5 py-3.5 font-semibold">Visitas</th>
                <th className="px-5 py-3.5 font-semibold">Condiciones activas</th>
                <th className="px-5 py-3.5 font-semibold text-right">Expediente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-4 font-medium text-primary-900">{p.fullName}</td>
                  <td className="px-5 py-4 text-primary-500">
                    <p>{p.phone}</p>
                    <p className="text-xs">{p.email}</p>
                  </td>
                  <td className="px-5 py-4 text-primary-500">{formatDate(p.lastVisit)}</td>
                  <td className="px-5 py-4 text-primary-500">{p.totalVisits}</td>
                  <td className="px-5 py-4">
                    {p.activeConditions.length === 0 ? (
                      <span className="text-xs text-primary-300">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {p.activeConditions.map((c) => (
                          <Badge key={c} variant="neutral">{c}</Badge>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline">
                      <FolderHeart className="h-3.5 w-3.5" />
                      Ver expediente
                    </button>
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
