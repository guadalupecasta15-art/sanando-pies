import type { Metadata } from "next";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { products } from "@/constants/mock-data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Productos" };

export default function ProductosPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="eyebrow">Cuidado en casa</span>
        <h1 className="section-heading mt-3">Productos recomendados</h1>
        <p className="mt-4 text-primary-600">
          Línea de productos seleccionados por nuestros especialistas para complementar tu tratamiento.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-card">
            <div className="relative h-48 w-full bg-primary-50">
              <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="font-display text-lg font-semibold text-primary-900">{p.name}</p>
              <p className="mt-2 text-sm text-primary-500">{p.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-primary-900">{formatCurrency(p.price)}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Disponible en clínica
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
