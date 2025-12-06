'use client';

import { cn } from "@/lib/utils";

interface GradientHoverProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  hoverFrom?: string;
  hoverVia?: string;
  hoverTo?: string;
}

export function GradientHover({
  children,
  className,
  from = "amber-600",
  via = "brown-600",
  to = "amber-600",
  hoverFrom = "brown-600",
  hoverVia = "amber-600",
  hoverTo = "brown-600",
}: GradientHoverProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent transition-all duration-700 bg-[length:200%_auto] hover:bg-[position:100%_0] cursor-pointer",
        `from-${from} via-${via} to-${to}`,
        `hover:from-${hoverFrom} hover:via-${hoverVia} hover:to-${hoverTo}`,
        className
      )}
    >
      {children}
    </span>
  );
} 