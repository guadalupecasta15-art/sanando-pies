import Image from "next/image";
import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Eye, Sprout } from "lucide-react";

export const metadata: Metadata = { title: "Nosotros" };

const values = [
  { icon: ShieldCheck, title: "Confianza", text: "Transparencia y ética en cada tratamiento." },
  { icon: HeartHandshake, title: "Cercanía", text: "Atención cálida y personalizada para cada paciente." },
  { icon: Eye, title: "Precisión", text: "Diagnósticos rigurosos apoyados en tecnología moderna." },
  { icon: Sprout, title: "Prevención", text: "Cuidado continuo para evitar complicaciones futuras." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="container-page py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Nuestra historia</span>
            <h1 className="section-heading mt-3">
              Más de una década cuidando la salud de tus pies
            </h1>
            <p className="mt-5 text-primary-600">
              Sanando Pies nació con el propósito de ofrecer atención podológica
              profesional, cercana y basada en evidencia. Comenzamos como un pequeño
              consultorio en Zapopan y hoy somos un equipo multidisciplinario dedicado
              a la salud integral del pie, desde valoraciones preventivas hasta
              tratamientos especializados para pie diabético.
            </p>
            <p className="mt-4 text-primary-600">
              Creemos que cada paso importa. Por eso combinamos tecnología moderna con
              un trato humano, cercano y personalizado para cada paciente que confía en nosotros.
            </p>
          </div>
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1000&auto=format&fit=crop"
              alt="Consultorio de Sanando Pies"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="mision" className="bg-primary-50 py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-card">
            <span className="eyebrow">Misión</span>
            <p className="mt-3 text-lg text-primary-800">
              Brindar atención podológica integral, segura y personalizada que mejore
              la calidad de vida de nuestros pacientes en cada etapa de su tratamiento.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-card">
            <span className="eyebrow">Visión</span>
            <p className="mt-3 text-lg text-primary-800">
              Ser la clínica de podología de referencia en la región, reconocida por
              la excelencia clínica, la innovación y el cuidado centrado en el paciente.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow">Lo que nos guía</span>
          <h2 className="section-heading mt-3">Nuestros valores</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border p-6 text-center">
              <v.icon className="mx-auto h-7 w-7 text-accent" />
              <p className="mt-4 font-display font-semibold text-primary-900">{v.title}</p>
              <p className="mt-2 text-sm text-primary-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
