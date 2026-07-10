"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminNav } from "@/config/nav.config";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { signOut } from "@/features/auth/actions";

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col bg-primary-900 text-primary-100",
        className
      )}
    >
      <div className="flex items-center gap-2.5 px-6 py-6">
        <Logo className="h-8 w-8" />
        <span className="font-display text-base font-semibold text-white">Sanando Pies</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {adminNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-primary-900"
                  : "text-primary-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut} className="border-t border-white/10 p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-primary-200 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Cerrar sesión
        </button>
      </form>
    </aside>
  );
}
