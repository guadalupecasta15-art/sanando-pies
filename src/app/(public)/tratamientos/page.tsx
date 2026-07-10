import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TreatmentIcon } from "@/components/public/treatment-icon";
import { treatments } from "@/constants/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Tratamientos" };

export default function TratamientosPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Cuidado especializado</span>
        <h1 className="section-heading mt-3">Nuestros tratamientos</h1>
        <p className="mt-4 text-primary-600">
          Diagnóstico y tratamiento de las condiciones más comunes del pie, con
          especialistas certificados y equipo esterilizado.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {treatments.map((t) => (
          <div
            key={t.id}
            id={t.slug}
            className="scroll-mt-28 rounded-2xl border border-border bg-white p-7 shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <TreatmentIcon name={t.icon} className="h-6 w-6" />
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold text-primary-900">
                  {formatCurrency(t.price)}
                </p>
                <p className="flex items-center justify-end gap-1 text-xs text-primary-400">
                  <Clock className="h-3.5 w-3.5" /> {t.durationMinutes} min
                </p>
              </div>
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-primary-900">{t.name}</h2>
            <p className="mt-2 text-sm text-primary-600">{t.description}</p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/contacto#cita">
                Agendar este tratamiento
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
