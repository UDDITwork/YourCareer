'use client';

import { Profile } from "@/lib/types";
import { User, Briefcase, GraduationCap, Code, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProfileRowProps {
  profile: Profile;
}

export function ProfileRow({ profile }: ProfileRowProps) {
  // Safely get array lengths, defaulting to 0 if null/undefined
  const workExperienceCount = Array.isArray(profile.work_experience) ? profile.work_experience.length : 0;
  const educationCount = Array.isArray(profile.education) ? profile.education.length : 0;
  const projectsCount = Array.isArray(profile.projects) ? profile.projects.length : 0;

  return (
    <div className="group relative font-['Times_New_Roman',_Times,_serif]">
      {/* Magazine-style profile row - 1960s aesthetic */}
      <div className="relative bg-white border-b border-black/50 transition-all duration-300">
        <div className="px-4 sm:px-6 py-3">
          {/* Main container - stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Left section with avatar, name and stats */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
              {/* Avatar and Name group */}
              <div className="flex items-center gap-4">
                {/* Magazine-style Avatar */}
                <div className="shrink-0 h-10 w-10 border border-black/50 bg-white flex items-center justify-center transition-all duration-300">
                  <User className="h-5 w-5 text-black" />
                </div>

                {/* Name - Magazine serif typography */}
                <h3 className="text-lg font-bold text-black whitespace-nowrap uppercase tracking-wide">
                  {profile.first_name} {profile.last_name}
                </h3>
              </div>

              {/* Stats Row - hidden on mobile, visible on sm and up */}
              <div className="hidden sm:flex items-center gap-3">
                {[
                  {
                    icon: Briefcase,
                    label: "Experience",
                    count: workExperienceCount
                  },
                  {
                    icon: GraduationCap,
                    label: "Education",
                    count: educationCount
                  },
                  {
                    icon: Code,
                    label: "Projects",
                    count: projectsCount
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 px-3 py-1 bg-white border border-black/50 transition-all duration-300 hover:border-black"
                  >
                    <stat.icon className="h-3 w-3 text-black" />
                    <span className="text-sm whitespace-nowrap">
                      <span className="font-semibold text-black">{stat.count}</span>
                      <span className="text-black/60 ml-1.5">{stat.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Button - Magazine style */}
            <Link href="/profile" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-black/50 rounded-none text-black hover:text-black transition-all font-['Times_New_Roman',_Times,_serif]"
              >
                <Pencil className="h-3.5 w-3.5 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 