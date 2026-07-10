"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitAppointmentRequest } from "@/features/appointments/services/appointment-requests.actions";

export function AppointmentRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const result = await submitAppointmentRequest({
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      reason: String(form.get("reason") ?? ""),
      comments: String(form.get("comments") ?? ""),
    });

    setFeedback(result.message);
    setStatus(result.success ? "success" : "error");
    if (result.success) e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-14 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <p className="font-display text-xl font-semibold text-primary-900">¡Solicitud enviada!</p>
        <p className="max-w-sm text-sm text-primary-600">{feedback}</p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <div>
        <Label htmlFor="fullName">Nombre y apellido *</Label>
        <Input id="fullName" name="fullName" placeholder="Ej. María González" required />
      </div>
      <div>
        <Label htmlFor="phone">Teléfono *</Label>
        <Input id="phone" name="phone" placeholder="33 1234 5678" required />
      </div>
      <div>
        <Label htmlFor="email">Correo *</Label>
        <Input id="email" name="email" type="email" placeholder="tu@correo.com" required />
      </div>
      <div>
        <Label htmlFor="reason">Motivo de consulta *</Label>
        <Input id="reason" name="reason" placeholder="Ej. Dolor en el talón" required />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="comments">Comentarios</Label>
        <Textarea id="comments" name="comments" rows={4} placeholder="Cuéntanos más sobre tu consulta (opcional)" />
      </div>

      {status === "error" && (
        <p className="md:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-danger">{feedback}</p>
      )}

      <div className="md:col-span-2">
        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={status === "loading"}>
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          Enviar solicitud
        </Button>
        <p className="mt-3 text-xs text-primary-400">
          Al enviar aceptas nuestro{" "}
          <a href="/aviso-de-privacidad" className="underline hover:text-accent">
            aviso de privacidad
          </a>
          . No se crea ninguna cuenta; un administrador confirmará tu cita.
        </p>
      </div>
    </form>
  );
}
