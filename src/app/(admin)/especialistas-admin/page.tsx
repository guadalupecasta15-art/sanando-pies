import type { Metadata } from "next";
import { Plus, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSpecialistsList } from "@/features/specialists/queries";

export const metadata: Metadata = { title: "Especialistas" };

export default async function EspecialistasAdminPage() {
  const specialists = await getSpecialistsList();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-primary-900">Especialistas</h1>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo especialista
        </Button>
      </div>
      {specialists.length === 0 && (
        <p className="text-sm text-primary-400">No hay especialistas registrados todavía.</p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {specialists.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100">
                {s.photoUrl ? (
                  <img src={s.photoUrl} alt={s.fullName} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-6 w-6 text-primary-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-primary-900">{s.fullName}</p>
                <p className="truncate text-xs text-primary-500">{s.specialty}</p>
                <p className="text-xs text-primary-400">{s.experienceYears} años de experiencia</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}