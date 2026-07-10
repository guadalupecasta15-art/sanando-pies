import Link from "next/link";
import Image from "next/image";
import { CalendarPlus, ArrowRight, ShieldCheck, Sparkles, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TreatmentIcon } from "@/components/public/treatment-icon";
import { treatments, testimonials, specialists } from "@/constants/mock-data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary-50">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Clínica de podología en Zapopan</span>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-primary-900 md:text-6xl">
              Cuidamos la salud de tus pies
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary-600">
              Tratamientos especializados para uña encarnada, hongos, pie diabético
              y salud integral del pie, con especialistas certificados y tecnología moderna.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contacto#cita">
                  <CalendarPlus className="h-4 w-4" />
                  Agenda tu cita
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/tratamientos">
                  Conocer tratamientos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-100 pt-8">
              <Feature icon={ShieldCheck} label="Atención personalizada" />
              <Feature icon={Sparkles} label="Tecnología moderna" />
              <Feature icon={Star} label="Resultados comprobados" />
            </div>
          </div>

          <div className="relative h-[380px] overflow-hidden rounded-[2rem] shadow-elevated md:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=1200&auto=format&fit=crop"
              alt="Especialista en podología atendiendo a un paciente"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* TRATAMIENTOS */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow">Lo que tratamos</span>
          <h2 className="section-heading mt-3">Nuestros tratamientos principales</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.slice(0, 4).map((t) => (
            <div
              key={t.id}
              className="group rounded-2xl border border-border bg-white p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <TreatmentIcon name={t.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-primary-900">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-primary-500">{t.description}</p>
              <Link
                href={`/tratamientos#${t.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Ver tratamiento
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="ghost">
            <Link href="/tratamientos">
              Ver todos los tratamientos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary-900">
        <div className="container-page grid grid-cols-2 gap-8 py-10 text-center text-white md:grid-cols-5">
          <Stat value="+500" label="Pacientes atendidos" />
          <Stat value="98%" label="Satisfacción de pacientes" />
          <Stat value="100%" label="Instrumental esterilizado" />
          <Stat value="1:1" label="Atención personalizada" />
          <Stat value="Certif." label="Especialistas certificados" />
        </div>
      </section>

      {/* ESPECIALISTAS PREVIEW */}
      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Nuestro equipo</span>
            <h2 className="section-heading mt-3">Especialistas certificados</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/especialistas">Ver equipo completo</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {specialists.map((s) => (
            <div key={s.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
              <div className="relative h-56 w-full">
                <Image src={s.photoUrl} alt={s.fullName} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-primary-900">{s.fullName}</p>
                <p className="mt-1 text-sm text-accent">{s.specialty}</p>
                <p className="mt-1 text-xs text-primary-400">{s.experienceYears} años de experiencia</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-primary-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow">Testimonios</span>
            <h2 className="section-heading mt-3">Lo que dicen nuestros pacientes</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-white p-6 shadow-card">
                <Quote className="h-6 w-6 text-primary-200" />
                <p className="mt-4 text-sm leading-relaxed text-primary-700">{t.comment}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary-900">{t.patientName}</p>
                    <p className="text-xs text-primary-400">{t.treatment}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page py-20">
        <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-primary-900 px-8 py-16 text-center text-white">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Agenda tu valoración podológica hoy
          </h2>
          <p className="max-w-lg text-primary-200">
            Nuestro equipo te ayudará a encontrar el tratamiento adecuado para tus pies.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link href="/contacto#cita">
              <CalendarPlus className="h-4 w-4" />
              Agenda tu cita
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function Feature({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
      <Icon className="h-5 w-5 text-accent" />
      <p className="text-xs font-medium text-primary-700">{label}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-primary-200 md:text-sm">{label}</p>
    </div>
  );
}
