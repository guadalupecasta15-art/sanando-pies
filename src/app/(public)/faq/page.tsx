import type { Metadata } from "next";
import { faqs } from "@/constants/mock-data";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

export default function FaqPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Ayuda</span>
        <h1 className="section-heading mt-3">Preguntas frecuentes</h1>
      </div>

      <div className="mx-auto mt-14 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-white">
        {faqs.map((f) => (
          <details key={f.id} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-primary-900">
              {f.question}
              <span className="ml-4 shrink-0 text-primary-400 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-primary-600">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
