import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { AppointmentRequestForm } from "@/components/public/appointment-request-form";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <>
      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow">Estamos para ayudarte</span>
          <h1 className="section-heading mt-3">Contacto</h1>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={Phone} title="Teléfono" lines={["+52 33 5036 8101"]} />
          <ContactCard icon={MessageCircle} title="WhatsApp" lines={["+52 33 5036 8101"]} />
          <ContactCard icon={Mail} title="Correo" lines={["zapopan@sanandopies.mx"]} />
          <ContactCard
            icon={Clock}
            title="Horarios"
            lines={["Lun – Vie: 9:00 a 19:00", "Sáb: 9:00 a 14:00"]}
          />
        </div>
      </section>

      <section id="cita" className="scroll-mt-20 bg-primary-50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow">Cita previa y consultas</span>
            <h2 className="section-heading mt-3">Solicita tu cita</h2>
            <p className="mt-4 text-primary-600">
              Completa el formulario y un miembro de nuestro equipo confirmará tu cita a la brevedad.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-white p-6 shadow-card md:p-10">
            <AppointmentRequestForm />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Ubicación</span>
            <h2 className="section-heading mt-3">Visítanos</h2>
            <p className="mt-4 flex items-start gap-2 text-primary-600">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              Av. del Pinar 3431, Pinar de la Calma, 45080 Zapopan, Jal., México
            </p>
          </div>
          <div className="h-80 w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Ubicación Sanando Pies"
              src="https://www.google.com/maps?q=Zapopan+Jalisco+M%C3%A9xico&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof Phone;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-card">
      <Icon className="mx-auto h-6 w-6 text-accent" />
      <p className="mt-3 font-display font-semibold text-primary-900">{title}</p>
      {lines.map((l) => (
        <p key={l} className="mt-1 text-sm text-primary-500">{l}</p>
      ))}
    </div>
  );
}
