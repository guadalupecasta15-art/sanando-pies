import type { Metadata } from "next";
import Link from "next/link";
import { Users, CalendarCheck2, Wallet, PackageX } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { AppointmentStatusBadge } from "@/components/admin/appointment-status-badge";
import { PatientsBarChart, RevenueLineChart, TreatmentsPieChart } from "@/components/admin/charts";
import {
  getDashboardStats,
  getTodayAppointments,
  getPatientsByMonth,
  getRevenueByMonth,
  getTreatmentDistribution,
} from "@/features/dashboard/queries";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [dashboardStats, todayAppointments, patientsByMonth, revenueByMonth, treatmentDistribution] =
    await Promise.all([
      getDashboardStats(),
      getTodayAppointments(),
      getPatientsByMonth(),
      getRevenueByMonth(),
      getTreatmentDistribution(),
    ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-900">Dashboard</h1>
          <p className="text-sm capitalize text-primary-500">{formatDate(new Date())}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Pacientes registrados"
          value={dashboardStats.registeredPatients.toString()}
          helper={`+${dashboardStats.patientsThisMonth} este mes`}
          trend="up"
          href="/pacientes"
        />
        <StatCard
          icon={CalendarCheck2}
          label="Citas hoy"
          value={dashboardStats.appointmentsToday.toString()}
          href="/agenda"
          hrefLabel="Ver agenda"
        />
        <StatCard
          icon={Wallet}
          label="Ingresos del mes"
          value={formatCurrency(dashboardStats.monthlyRevenue)}
          helper={`${dashboardStats.revenueChangePct >= 0 ? "+" : ""}${dashboardStats.revenueChangePct}% vs. mes anterior`}
          trend={dashboardStats.revenueChangePct >= 0 ? "up" : "down"}
        />
        <StatCard
          icon={PackageX}
          label="Productos bajos"
          value={dashboardStats.lowStockProducts.toString()}
          href="/inventario"
          hrefLabel="Ver inventario"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Agenda de hoy</CardTitle>
            <Link href="/agenda" className="text-xs font-semibold text-accent hover:underline">
              Ver toda la agenda
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.length === 0 && (
              <p className="text-sm text-primary-400">No hay citas programadas para hoy.</p>
            )}
            {todayAppointments.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3.5"
              >
                <div className="w-16 shrink-0 text-sm font-semibold text-primary-900">
                  {a.startTime}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-primary-900">{a.patientName}</p>
                  <p className="truncate text-xs text-primary-400">
                    {a.service} · {a.specialistName} · {a.room}
                  </p>
                </div>
                <AppointmentStatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tratamientos más solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <TreatmentsPieChart data={treatmentDistribution} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pacientes por mes</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientsBarChart data={patientsByMonth} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresos del mes</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueLineChart data={revenueByMonth} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
