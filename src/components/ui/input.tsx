import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-primary-900 placeholder:text-primary-400/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
