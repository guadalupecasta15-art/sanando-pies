"use client";

import { useState, type FormEvent } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPatient } from "@/features/patients/actions";

export function NewPatientDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const result = await createPatient(form);

    if (result.success) {
      setOpen(false);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.message ?? "No se pudo guardar el paciente.");
    }
    setLoading(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Nuevo paciente
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-primary-900">Nuevo paciente</h2>
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
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input id="fullName" name="fullName" required placeholder="Ana Martinez" />
              </div>
              <div>
                <Label htmlFor="phone">Telefono</Label>
                <Input id="phone" name="phone" required placeholder="33 1122 3344" />
              </div>
              <div>
                <Label htmlFor="email">Correo electronico</Label>
                <Input id="email" name="email" type="email" placeholder="ana@correo.com" />
              </div>
              <div>
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input id="birthDate" name="birthDate" type="date" />
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
                  Guardar paciente
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}