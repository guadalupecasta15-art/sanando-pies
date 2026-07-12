import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentStatusBadge } from "@/components/admin/appointment-status-badge";
import { getPatientDetail, getPatientAppointments } from "@/features/patients/queries";
import { formatDate } from "@/lib/utils";
import type { AppointmentStatus } from "@/types/domain";

export const metadata: Metadata = { title: "Expediente del paciente" };

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatientDetail(id);
  if (!patient) notFound();

  const appointments = await getPatientAppointments(id);

  return (
    <div className="space-y-6">
      <Link
        href="/pacientes"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a pacientes
      </Link>

      <div>
        <h1 className="font-display text-2xl font-semibold text-primary-900">{patient.fullName}</h1>
        <p className="text-sm text-primary-500">
          {patient.phone}
          {patient.email ? ` - ${patient.email}` : ""}
          {patient.birthDate ? ` - Nacimiento: ${formatDate(patient.birthDate)}` : ""}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expediente medico</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase text-primary-400">Alergias</p>
            <p className="text-sm text-primary-700">{patient.allergies || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-primary-400">Historial medico</p>
            <p className="text-sm text-primary-700">{patient.medicalHistory || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-primary-400">Notas</p>
            <p className="text-sm text-primary-700">{patient.notes || "-"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de tratamientos ({appointments.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Fecha</th>
                <th className="px-5 py-3.5 font-semibold">Horario</th>
                <th className="px-5 py-3.5 font-semibold">Tratamiento</th>
                <th className="px-5 py-3.5 font-semibold">Especialista</th>
                <th className="px-5 py-3.5 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-sm text-primary-400">
                    Este paciente aun no tiene consultas registradas.
                  </td>
                </tr>
              )}
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-primary-50/50">
                  <td className="px-5 py-4 text-primary-900">{formatDate(a.date)}</td>
                  <td className="px-5 py-4 text-primary-500">
                    {a.startTime} - {a.endTime}
                  </td>
                  <td className="px-5 py-4 font-medium text-primary-900">{a.serviceName}</td>
                  <td className="px-5 py-4 text-primary-500">{a.specialistName}</td>
                  <td className="px-5 py-4">
                    <AppointmentStatusBadge status={a.status as AppointmentStatus} />
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
