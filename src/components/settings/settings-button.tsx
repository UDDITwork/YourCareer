'use client';

import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SettingsButtonProps {
  className?: string;
}

export function SettingsButton({ className }: SettingsButtonProps) {

  return (
    <Link
      href="/settings"
      className={cn(
        "flex items-center gap-1.5 px-3 py-1",
        "text-sm font-medium text-black/80 hover:text-black",
        "transition-colors duration-200 uppercase tracking-wide",
        "font-['Times_New_Roman',_Times,_serif]",
        className
      )}
    >
      <Settings className="h-4 w-4" />
      <span className="hidden sm:inline">Settings</span>
    </Link>
  );
} 