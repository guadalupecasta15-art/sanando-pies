import type { Metadata } from "next";
import { Wallet, TrendingUp, Receipt } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { RevenueLineChart } from "@/components/admin/charts";
import { getDashboardStats, getRevenueByMonth, getFinanceSummary } from "@/features/dashboard/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Finanzas" };

export default async function FinanzasPage() {
  const [dashboardStats, revenueByMonth, financeSummary] = await Promise.all([
    getDashboardStats(),
    getRevenueByMonth(),
    getFinanceSummary(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary-900">Finanzas</h1>
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label="Ingresos del mes"
          value={formatCurrency(dashboardStats.monthlyRevenue)}
          trend={dashboardStats.revenueChangePct >= 0 ? "up" : "down"}
          helper={`${dashboardStats.revenueChangePct >= 0 ? "+" : ""}${dashboardStats.revenueChangePct}% vs. mes anterior`}
        />
        <StatCard icon={TrendingUp} label="Ticket promedio" value={formatCurrency(financeSummary.averageTicket)} />
        <StatCard icon={Receipt} label="Transacciones del mes" value={financeSummary.transactionsThisMonth.toString()} />
      </div>
      <Card>
        <CardHeader><CardTitle>Ingresos mensuales</CardTitle></CardHeader>
        <CardContent><RevenueLineChart data={revenueByMonth} /></CardContent>
      </Card>
    </div>
  );
}