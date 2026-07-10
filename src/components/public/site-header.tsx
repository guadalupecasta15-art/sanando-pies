"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarPlus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicNav } from "@/config/nav.config";
import { Logo } from "@/components/shared/logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-primary-900">
              Sanando Pies
            </p>
            <p className="text-[11px] uppercase tracking-wide text-primary-400">
              Clínica de Podología
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary-700 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="accent">
            <Link href="/contacto#cita">
              <CalendarPlus className="h-4 w-4" />
              Agenda tu cita
            </Link>
          </Button>
        </div>

        <button
          aria-label="Abrir menú"
          className="rounded-lg p-2 text-primary-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-800 hover:bg-primary-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="accent" className="mt-2">
              <Link href="/contacto#cita">Agenda tu cita</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
