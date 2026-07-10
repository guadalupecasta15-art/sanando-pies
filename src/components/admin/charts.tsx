"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

const gridStroke = "#E3EBF3";
const axisStyle = { fontSize: 12, fill: "#6B87A6" };

export function PatientsBarChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ left: -20 }}>
        <CartesianGrid vertical={false} stroke={gridStroke} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisStyle} />
        <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
        <Tooltip cursor={{ fill: "#EAF2FA" }} />
        <Bar dataKey="total" fill="#1E5FA8" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RevenueLineChart({ data }: { data: { month: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: -20 }}>
        <CartesianGrid vertical={false} stroke={gridStroke} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisStyle} />
        <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
        <Tooltip formatter={(v: number) => formatCurrency(v)} />
        <Line type="monotone" dataKey="total" stroke="#0B2A4A" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function TreatmentsPieChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={40} outerRadius={68} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-primary-600">{d.name}</span>
            <span className="ml-auto font-medium text-primary-900">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
