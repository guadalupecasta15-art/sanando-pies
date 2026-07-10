import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FolderHeart,
  Stethoscope,
  ListChecks,
  Package,
  Boxes,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

export const publicNav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Especialistas", href: "/especialistas" },
  { label: "Productos", href: "/productos" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Contacto", href: "/contacto" },
];

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agenda", href: "/agenda", icon: CalendarDays },
  { label: "Pacientes", href: "/pacientes", icon: Users },
  { label: "Expedientes", href: "/pacientes", icon: FolderHeart },
  { label: "Especialistas", href: "/especialistas-admin", icon: Stethoscope },
  { label: "Servicios", href: "/servicios-admin", icon: ListChecks },
  { label: "Productos", href: "/productos-admin", icon: Package },
  { label: "Inventario", href: "/inventario", icon: Boxes },
  { label: "Finanzas", href: "/finanzas", icon: Wallet },
  { label: "Reportes", href: "/reportes", icon: BarChart3 },
  { label: "Configuración", href: "/configuracion", icon: Settings },
];
