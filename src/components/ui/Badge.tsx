import { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  variant?: "normal" | "warning" | "critical" | "info" | "purple";
  className?: string;
}

export function Badge({ children, variant = "info", className }: BadgeProps) {
  const variants = {
    normal: "bg-alert-normal/10 text-alert-normal border-alert-normal/20",
    warning: "bg-alert-warning/10 text-alert-warning border-alert-warning/20",
    critical: "bg-alert-critical/10 text-alert-critical border-alert-critical/20",
    info: "bg-accent-teal/10 text-accent-teal border-accent-teal/20",
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
  };

  return (
    <span 
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-[0.08em] border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
