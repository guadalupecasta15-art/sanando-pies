import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Lock } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export function SiteFooter() {
  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-semibold text-white">
              Sanando Pies
            </span>
          </div>
          <p className="mt-4 text-sm text-primary-200">
            Clínica de podología dedicada al cuidado integral de la salud de tus pies,
            con atención personalizada y tecnología moderna.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="WhatsApp" className="rounded-full bg-white/10 p-2 hover:bg-white/20">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Institucional</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-200">
            <li><Link href="/nosotros" className="hover:text-white">Quiénes somos</Link></li>
            <li><Link href="/nosotros#mision" className="hover:text-white">Misión y visión</Link></li>
            <li><Link href="/especialistas" className="hover:text-white">Especialistas</Link></li>
            <li><Link href="/testimonios" className="hover:text-white">Testimonios</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-200">
            <li><Link href="/aviso-de-privacidad" className="hover:text-white">Aviso de privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Términos y condiciones</Link></li>
            <li><Link href="/faq" className="hover:text-white">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-200">
            <li>Av. del Pinar 3431, Pinar de la Calma, 45080 Zapopan, Jal.</li>
            <li>+52 33 5036 8101</li>
            <li>zapopan@sanandopies.mx</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-primary-300 md:flex-row">
          <p>© {new Date().getFullYear()} Sanando Pies. Todos los derechos reservados.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-primary-300 hover:text-white"
          >
            <Lock className="h-3.5 w-3.5" />
            Iniciar sesión administrador
          </Link>
        </div>
      </div>
    </footer>
  );
}
