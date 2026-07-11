import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppointmentStatusBadge } from "@/components/admin/appointment-status-badge";
import { getTodayAppointments } from "@/features/dashboard/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const todayAppointments = await getTodayAppointments();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-900">Agenda</h1>
          <p className="text-sm capitalize text-primary-500">{formatDate(new Date())}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nueva cita
        </Button>
      </div>
      <div className="inline-flex rounded-lg border border-border bg-white p-1">
        {["Día", "Semana", "Mes"].map((v, i) => (
          <button
            key={v}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              i === 0 ? "bg-primary-900 text-white" : "text-primary-600 hover:bg-primary-50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {todayAppointments.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-primary-400">
                No hay citas programadas para hoy.
              </p>
            )}
            {todayAppointments.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="w-20 shrink-0">
                  <p className="text-sm font-semibold text-primary-900">{a.startTime}</p>
                  <p className="text-xs text-primary-400">{a.endTime}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-primary-900">{a.patientName}</p>
                  <p className="text-xs text-primary-400">{a.service}</p>
                </div>
                <div className="hidden text-sm text-primary-600 sm:block">{a.specialistName}</div>
                <div className="hidden text-sm text-primary-400 md:block">{a.room}</div>
                <AppointmentStatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}