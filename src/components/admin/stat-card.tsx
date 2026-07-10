import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  href,
  hrefLabel,
  trend,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper?: string;
  href?: string;
  hrefLabel?: string;
  trend?: "up" | "down";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-primary-500">{label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-primary-900">{value}</p>
          {helper && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-danger",
                !trend && "text-primary-400"
              )}
            >
              {helper}
            </p>
          )}
          {href && (
            <Link href={href} className="mt-1 inline-block text-xs font-semibold text-accent hover:underline">
              {hrefLabel ?? "Ver más"}
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
