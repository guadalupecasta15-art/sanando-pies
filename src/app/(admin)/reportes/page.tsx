import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PatientsBarChart, TreatmentsPieChart } from "@/components/admin/charts";
import { AppointmentRequestCard } from "@/components/admin/appointment-request-card";
import {
  getPatientsByMonth,
  getTreatmentDistribution,
  getPendingAppointmentRequests,
} from "@/features/dashboard/queries";
import { getAppointmentFormOptions } from "@/features/appointments/lookups";

export const metadata: Metadata = { title: "Reportes" };

export default async function ReportesPage() {
  const [patientsByMonth, treatmentDistribution, requests, formOptions] = await Promise.all([
    getPatientsByMonth(),
    getTreatmentDistribution(),
    getPendingAppointmentRequests(),
    getAppointmentFormOptions(),
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
          <CardHeader><CardTitle>Tratamientos mas solicitados</CardTitle></CardHeader>
          <CardContent><TreatmentsPieChart data={treatmentDistribution} /></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Solicitudes de cita pendientes de gestion</CardTitle></CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-sm text-primary-500">No hay solicitudes pendientes por el momento.</p>
          ) : (
            <div className="divide-y divide-border">
              {requests.map((r) => (
                <AppointmentRequestCard
                  key={r.id}
                  request={r}
                  specialists={formOptions.specialists}
                  services={formOptions.services}
                  rooms={formOptions.rooms}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}