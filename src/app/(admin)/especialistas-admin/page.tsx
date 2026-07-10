import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { specialists } from "@/constants/mock-data";

export const metadata: Metadata = { title: "Especialistas" };

export default function EspecialistasAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-primary-900">Especialistas</h1>
        <Button>
          <Plus className="h-4 w-4" />
          Nuevo especialista
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {specialists.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image src={s.photoUrl} alt={s.fullName} fill className="object-cover" />
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
