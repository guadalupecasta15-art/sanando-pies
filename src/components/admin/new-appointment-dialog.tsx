"use client";

import { useState, type FormEvent } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAppointment } from "@/features/appointments/actions";

interface ServiceOption {
  id: string;
  label: string;
  durationMinutes: number;
}

interface LookupOption {
  id: string;
  label: string;
}

interface NewAppointmentDialogProps {
  patients: LookupOption[];
  specialists: LookupOption[];
  services: ServiceOption[];
  rooms: LookupOption[];
}

export function NewAppointmentDialog({ patients, specialists, services, rooms }: NewAppointmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const selectedService = services.find((s) => s.id === selectedServiceId);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    if (selectedService) {
      form.set("durationMinutes", String(selectedService.durationMinutes));
    }

    const result = await createAppointment(form);

    if (result.success) {
      setOpen(false);
      (e.target as HTMLFormElement).reset();
      setSelectedServiceId("");
    } else {
      setError(result.message ?? "No se pudo guardar la cita.");
    }
    setLoading(false);
  }

  const selectClass =
    "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Nueva cita
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-primary-900">Nueva cita</h2>
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
                <Label htmlFor="patientId">Paciente</Label>
                <select id="patientId" name="patientId" required className={selectClass} defaultValue="">
                  <option value="" disabled>Selecciona un paciente</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="specialistId">Especialista</Label>
                <select id="specialistId" name="specialistId" required className={selectClass} defaultValue="">
                  <option value="" disabled>Selecciona un especialista</option>
                  {specialists.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="serviceId">Servicio</Label>
                <select
                  id="serviceId"
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
                <Label htmlFor="roomId">Consultorio</Label>
                <select id="roomId" name="roomId" className={selectClass} defaultValue="">
                  <option value="">Sin asignar</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="appointmentDate">Fecha</Label>
                  <Input id="appointmentDate" name="appointmentDate" type="date" required />
                </div>
                <div>
                  <Label htmlFor="startTime">Hora de inicio</Label>
                  <Input id="startTime" name="startTime" type="time" required />
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
                  Guardar cita
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}