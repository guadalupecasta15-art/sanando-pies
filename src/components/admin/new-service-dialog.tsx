"use client";
import { useState, type FormEvent } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createService } from "@/features/services/actions";

export function NewServiceDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const result = await createService(form);
    if (result.success) {
      setOpen(false);
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.message ?? "No se pudo guardar el servicio.");
    }
    setLoading(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        Nuevo servicio
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-primary-900">Nuevo servicio</h2>
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
                <Label htmlFor="name">Nombre del servicio</Label>
                <Input id="name" name="name" required placeholder="Retiro de una encarnada" />
              </div>
              <div>
                <Label htmlFor="durationMinutes">Duracion (minutos)</Label>
                <Input id="durationMinutes" name="durationMinutes" type="number" min="1" required placeholder="45" />
              </div>
              <div>
                <Label htmlFor="price">Precio (MXN)</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" required placeholder="450" />
              </div>
              <div>
                <Label htmlFor="description">Descripcion (opcional)</Label>
                <Input id="description" name="description" placeholder="Breve descripcion del servicio" />
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
                  Guardar servicio
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}