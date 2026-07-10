import type { Metadata } from "next";
export const metadata: Metadata = { title: "Aviso de privacidad" };
export default function Page() {
  return (
    <section className="container-page py-16 md:py-24">
      <h1 className="section-heading">Aviso de privacidad</h1>
      <p className="mt-6 max-w-2xl text-primary-600">
        Sanando Pies protege los datos personales que nos compartes a través de este sitio,
        utilizándolos únicamente para gestionar tu solicitud de cita y brindarte atención
        clínica. No compartimos tu información con terceros sin tu consentimiento. Contenido
        completo pendiente de redacción legal final.
      </p>
    </section>
  );
}
