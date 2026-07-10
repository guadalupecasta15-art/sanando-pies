import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/constants/mock-data";

export const metadata: Metadata = { title: "Testimonios" };

export default function TestimoniosPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Pacientes felices</span>
        <h1 className="section-heading mt-3">Testimonios</h1>
        <p className="mt-4 text-primary-600">
          La confianza de quienes han vivido su tratamiento con nosotros es nuestro mejor respaldo.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border bg-white p-7 shadow-card">
            <Quote className="h-6 w-6 text-primary-200" />
            <p className="mt-4 text-sm leading-relaxed text-primary-700">{t.comment}</p>
            <div className="mt-6 flex items-center justify-between">
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
    </section>
  );
}
