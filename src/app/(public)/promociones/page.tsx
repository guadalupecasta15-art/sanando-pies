import type { Metadata } from "next";
import { Percent } from "lucide-react";
export const metadata: Metadata = { title: "Promociones" };
export default function PromocionesPage() {
  return (
    <section className="container-page py-16 md:py-24 text-center">
      <span className="eyebrow">Ofertas vigentes</span>
      <h1 className="section-heading mt-3">Promociones</h1>
      <div className="mx-auto mt-14 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-primary-200 p-12 text-primary-400">
        <Percent className="h-8 w-8" />
        <p>Por ahora no tenemos promociones activas. Vuelve pronto.</p>
      </div>
    </section>
  );
}
