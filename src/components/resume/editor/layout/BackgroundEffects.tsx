import { cn } from "@/lib/utils";

interface BackgroundEffectsProps {
  className?: string;
  isBaseResume?: boolean;
}

export function BackgroundEffects({ className }: BackgroundEffectsProps) {
  return (
    <div className={cn("fixed inset-0 z-0 overflow-hidden h-[calc(100vh)]", className)}>
      {/* Solid cream background - 1980s magazine paper */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.05%27/%3E%3C/svg%3E')]" />

      {/* Subtle editorial grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  );
} 