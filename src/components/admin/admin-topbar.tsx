"use client";

import { useState } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminTopbar({ userName = "Dr. Alejandro" }: { userName?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-border bg-white px-4 md:px-8">
      <button
        className="rounded-lg p-2 text-primary-700 hover:bg-primary-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-400" />
        <Input placeholder="Buscar pacientes, citas, productos..." className="pl-10" />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative rounded-full p-2 text-primary-700 hover:bg-primary-50" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-display text-sm font-semibold text-primary-800">
            {userName.charAt(0)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight text-primary-900">{userName}</p>
            <p className="text-xs text-primary-400">Administrador</p>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <AdminSidebar className="relative z-10" />
        </div>
      )}
    </header>
  );
}
