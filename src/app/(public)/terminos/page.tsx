import type { Metadata } from "next";
export const metadata: Metadata = { title: "Términos y condiciones" };
export default function Page() {
  return (
    <section className="container-page py-16 md:py-24">
      <h1 className="section-heading">Términos y condiciones</h1>
      <p className="mt-6 max-w-2xl text-primary-600">
        El uso de este sitio web implica la aceptación de nuestras políticas de agendado,
        cancelación y tratamiento de datos. Contenido completo pendiente de redacción legal final.
      </p>
    </section>
  );
}
