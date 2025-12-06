'use client';

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProUpgradeButtonProps {
  className?: string;
}

export function ProUpgradeButton({ className }: ProUpgradeButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("relative group font-['Times_New_Roman',_Times,_serif]", className)}
    >
      <Link
        href="/subscription"
        className={cn(
          "relative flex items-center gap-1.5 px-4 py-1.5",
          "bg-black",
          "hover:bg-gray-800",
          "text-white font-medium rounded-none",
          "border border-black",
          "transition-all duration-300 ease-in-out",
          "hover:-translate-y-0.5",
          "text-sm uppercase tracking-wide"
        )}
      >
        <Sparkles className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <span className="transition-all duration-300 ease-in-out group-hover:translate-x-0.5">Upgrade to Pro</span>
      </Link>
    </motion.div>
  );
} 