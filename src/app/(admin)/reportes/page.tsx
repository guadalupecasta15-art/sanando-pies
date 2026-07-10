import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PatientsBarChart, TreatmentsPieChart } from "@/components/admin/charts";
import { patientsByMonth, treatmentDistribution } from "@/constants/mock-data";

export const metadata: Metadata = { title: "Reportes" };

export default function ReportesPage() {
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
        <CardContent className="text-sm text-primary-500">
          Las solicitudes enviadas desde el sitio público aparecerán aquí para su conversión en citas confirmadas (Etapa 4).
        </CardContent>
      </Card>
    </div>
  );
}
