import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AppointmentStatusBadge } from "@/components/admin/appointment-status-badge";
import { NewAppointmentDialog } from "@/components/admin/new-appointment-dialog";
import { getAppointmentsByRange, getRangeForView } from "@/features/appointments/agenda-queries";
import { getAppointmentFormOptions } from "@/features/appointments/lookups";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Agenda" };

const VIEWS = [
  { value: "dia", label: "Dia" },
  { value: "semana", label: "Semana" },
  { value: "mes", label: "Mes" },
];

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ vista?: string }>;
}) {
  const { vista } = await searchParams;
  const view = vista && ["dia", "semana", "mes"].includes(vista) ? vista : "dia";

  const [appointments, formOptions] = await Promise.all([
    getAppointmentsByRange(view),
    getAppointmentFormOptions(),
  ]);

  const { start, end } = getRangeForView(view);
  const rangeLabel =
    view === "dia" ? formatDate(new Date(`${start}T12:00:00`)) : `${formatDate(new Date(`${start}T12:00:00`))} - ${formatDate(new Date(`${end}T12:00:00`))}`;

  const groupedByDate = appointments.reduce<Record<string, typeof appointments>>((acc, a) => {
    if (!acc[a.date]) acc[a.date] = [];
    acc[a.date].push(a);
    return acc;
  }, {});
  const dateKeys = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-900">Agenda</h1>
          <p className="text-sm capitalize text-primary-500">{rangeLabel}</p>
        </div>
        <NewAppointmentDialog
          patients={formOptions.patients}
          specialists={formOptions.specialists}
          services={formOptions.services}
          rooms={formOptions.rooms}
        />
      </div>

      <div className="inline-flex rounded-lg border border-border bg-white p-1">
        {VIEWS.map((v) => (
          <Link
            key={v.value}
            href={`/agenda?vista=${v.value}`}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              view === v.value ? "bg-primary-900 text-white" : "text-primary-600 hover:bg-primary-50"
            }`}
          >
            {v.label}
          </Link>
        ))}
      </div>

      {dateKeys.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-sm text-primary-400">
            No hay citas programadas en este periodo.
          </CardContent>
        </Card>
      )}

      {dateKeys.map((dateKey) => (
        <Card key={dateKey}>
          {view !== "dia" && (
            <div className="border-b border-border px-5 py-3">
              <p className="text-sm font-semibold capitalize text-primary-900">
                {formatDate(new Date(`${dateKey}T12:00:00`))}
              </p>
            </div>
          )}
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {groupedByDate[dateKey].map((a) => (
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
      ))}
    </div>
  );
}