"use client";

import { useState, type FormEvent } from "react";
import { Calendar, X, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertRequestToAppointment, dismissRequest } from "@/features/appointments/request-actions";
import { formatDate } from "@/lib/utils";

interface ServiceOption {
  id: string;
  label: string;
  durationMinutes: number;
}

interface LookupOption {
  id: string;
  label: string;
}

interface AppointmentRequestCardProps {
  request: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    reason: string | null;
    createdAt: string;
  };
  specialists: LookupOption[];
  services: ServiceOption[];
  rooms: LookupOption[];
}

export function AppointmentRequestCard({ request, specialists, services, rooms }: AppointmentRequestCardProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectClass =
    "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    form.set("requestId", request.id);
    form.set("fullName", request.fullName);
    form.set("phone", request.phone);
    form.set("email", request.email);
    if (selectedService) {
      form.set("durationMinutes", String(selectedService.durationMinutes));
    }

    const result = await convertRequestToAppointment(form);

    if (result.success) {
      setOpen(false);
    } else {
      setError(result.message ?? "No se pudo agendar la cita.");
    }
    setLoading(false);
  }

  async function handleDismiss() {
    setDismissing(true);
    await dismissRequest(request.id);
    setDismissing(false);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div>
          <p className="text-sm font-medium text-primary-900">{request.fullName}</p>
          <p className="text-xs text-primary-400">
            {request.phone} {request.reason ? `· ${request.reason}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-primary-400">{formatDate(request.createdAt)}</p>
          <Button size="sm" variant="outline" onClick={handleDismiss} disabled={dismissing}>
            {dismissing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            Descartar
          </Button>
          <Button size="sm" onClick={() => setOpen(true)}>
            <Calendar className="h-3.5 w-3.5" />
            Agendar cita
          </Button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-primary-900">
                Agendar cita para {request.fullName}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-primary-400 hover:text-primary-700"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor={`specialistId-${request.id}`}>Especialista</Label>
                <select id={`specialistId-${request.id}`} name="specialistId" required className={selectClass} defaultValue="">
                  <option value="" disabled>Selecciona un especialista</option>
                  {specialists.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor={`serviceId-${request.id}`}>Servicio</Label>
                <select
                  id={`serviceId-${request.id}`}
                  name="serviceId"
                  required
                  className={selectClass}
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  <option value="" disabled>Selecciona un servicio</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.label} ({s.durationMinutes} min)</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor={`roomId-${request.id}`}>Consultorio</Label>
                <select id={`roomId-${request.id}`} name="roomId" className={selectClass} defaultValue="">
                  <option value="">Sin asignar</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`appointmentDate-${request.id}`}>Fecha</Label>
                  <Input id={`appointmentDate-${request.id}`} name="appointmentDate" type="date" required />
                </div>
                <div>
                  <Label htmlFor={`startTime-${request.id}`}>Hora de inicio</Label>
                  <Input id={`startTime-${request.id}`} name="startTime" type="time" required />
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Confirmar cita
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}