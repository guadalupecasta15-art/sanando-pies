import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PatientsBarChart, TreatmentsPieChart } from "@/components/admin/charts";
import {
  getPatientsByMonth,
  getTreatmentDistribution,
  getPendingAppointmentRequests,
} from "@/features/dashboard/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Reportes" };

export default async function ReportesPage() {
  const [patientsByMonth, treatmentDistribution, requests] = await Promise.all([
    getPatientsByMonth(),
    getTreatmentDistribution(),
    getPendingAppointmentRequests(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary-900">Reportes</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Pacientes por mes</CardTitle></CardHeader>
          <CardContent><PatientsBarChart data={patientsByMonth} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tratamientos más solicitados</CardTitle></CardHeader>
          <CardContent><TreatmentsPieChart data={treatmentDistribution} /></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Solicitudes de cita pendientes de gestión</CardTitle></CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-sm text-primary-500">No hay solicitudes pendientes por el momento.</p>
          ) : (
            <div className="divide-y divide-border">
              {requests.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div>
                    <p className="text-sm font-medium text-primary-900">{r.fullName}</p>
                    <p className="text-xs text-primary-400">
                      {r.phone} {r.reason ? `· ${r.reason}` : ""}
                    </p>
                  </div>
                  <p className="text-xs text-primary-400">{formatDate(r.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}