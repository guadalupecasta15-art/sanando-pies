import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-primary-50 text-primary-700",
        pendiente: "bg-amber-50 text-amber-700",
        confirmada: "bg-blue-50 text-blue-700",
        en_consulta: "bg-purple-50 text-purple-700",
        finalizada: "bg-emerald-50 text-emerald-700",
        cancelada: "bg-red-50 text-red-700",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
