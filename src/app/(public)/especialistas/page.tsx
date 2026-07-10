import type { Metadata } from "next";
import Image from "next/image";
import { specialists } from "@/constants/mock-data";

export const metadata: Metadata = { title: "Especialistas" };

export default function EspecialistasPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Nuestro equipo</span>
        <h1 className="section-heading mt-3">Especialistas certificados</h1>
        <p className="mt-4 text-primary-600">
          Profesionales con formación especializada en podología clínica, quirúrgica y biomecánica.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {specialists.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <div className="relative h-64 w-full">
              <Image src={s.photoUrl} alt={s.fullName} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="font-display text-xl font-semibold text-primary-900">{s.fullName}</p>
              <p className="mt-1 text-sm font-medium text-accent">{s.specialty}</p>
              <p className="mt-3 text-sm text-primary-500">{s.bio}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-primary-400">
                {s.experienceYears} años de experiencia
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
