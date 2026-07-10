import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, ScanEye } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel lateral de marca */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary-900 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-700/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="font-display text-lg font-semibold">Sanando Pies</span>
        </Link>

        <div className="relative z-10 max-w-sm">
          <h1 className="font-display text-4xl font-semibold leading-tight">
            Sistema Integral de Administración Clínica
          </h1>
          <p className="mt-4 text-primary-200">
            Plataforma profesional para la gestión y administración de la clínica de podología.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-100">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-white" /> Seguridad
            </li>
            <li className="flex items-center gap-2.5">
              <Lock className="h-4 w-4 text-white" /> Confidencialidad
            </li>
            <li className="flex items-center gap-2.5">
              <ScanEye className="h-4 w-4 text-white" /> Control total de tu clínica
            </li>
          </ul>
        </div>

        <p className="relative z-10 text-xs text-primary-300">
          © {new Date().getFullYear()} Sanando Pies. Todos los derechos reservados.
        </p>
      </div>

      {/* Formulario */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo className="h-10 w-10" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-primary-900">Bienvenido</h2>
          <p className="mt-1 text-sm text-primary-500">Inicia sesión para continuar</p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-8 text-center text-xs text-primary-400">
            Acceso exclusivo para personal autorizado de Sanando Pies.{" "}
            <Link href="/" className="font-medium text-accent hover:underline">
              Volver al sitio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
