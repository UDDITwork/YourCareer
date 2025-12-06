'use client';

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  asLink?: boolean;
}

export function Logo({ className, asLink = true }: LogoProps) {
  const logoContent = (
    <div className={cn("transition-transform duration-500 hover:scale-105 flex items-center gap-2 font-['Times_New_Roman',_Times,_serif]", className)}>
      <Image
        src="/logos/favicon.ico"
        alt="YourCareer Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="text-xl font-bold text-black">YourCareer</span>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
