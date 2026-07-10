import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-border bg-white px-3.5 py-3 text-sm text-primary-900 placeholder:text-primary-400/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
