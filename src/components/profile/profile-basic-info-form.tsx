'use client';

import { Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User } from "lucide-react";

interface ProfileBasicInfoFormProps {
  profile: Profile;
  onChange: (field: keyof Profile, value: string) => void;
}

export function ProfileBasicInfoForm({ profile, onChange }: ProfileBasicInfoFormProps) {
  return (
    <div className="space-y-6 font-['Times_New_Roman',_Times,_serif]">
      {/* Personal Details */}
      <Card className="relative bg-white border border-black/50 rounded-none shadow-none">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Name Row */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <User className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  value={profile.first_name || ''}
                  onChange={(e) => onChange('first_name', e.target.value)}
                  className="pr-12 text-lg bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="First Name"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  FIRST NAME
                </div>
              </div>
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <User className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  value={profile.last_name || ''}
                  onChange={(e) => onChange('last_name', e.target.value)}
                  className="pr-12 text-lg bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="Last Name"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  LAST NAME
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Mail className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => onChange('email', e.target.value)}
                  className="pr-12 bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="email@example.com"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  EMAIL
                </div>
              </div>
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Phone className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  type="tel"
                  value={profile.phone_number || ''}
                  onChange={(e) => onChange('phone_number', e.target.value)}
                  className="pr-12 bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="+1 (555) 000-0000"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  PHONE
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="relative group">
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <MapPin className="h-4 w-4 text-black/60" />
              </div>
              <Input
                value={profile.location || ''}
                onChange={(e) => onChange('location', e.target.value)}
                className="pr-12 bg-white border border-black/50 rounded-none
                  focus:border-black focus:ring-0
                  placeholder:text-gray-400
                  font-['Times_New_Roman',_Times,_serif]"
                placeholder="City, State, Country"
              />
              <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                LOCATION
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card className="relative bg-white border border-black/50 rounded-none shadow-none">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Website and LinkedIn */}
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Globe className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  type="url"
                  value={profile.website || ''}
                  onChange={(e) => onChange('website', e.target.value)}
                  className="pr-12 bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="https://your-website.com"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  WEBSITE
                </div>
              </div>
              <div className="relative group flex-1">
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Linkedin className="h-4 w-4 text-black/60" />
                </div>
                <Input
                  type="url"
                  value={profile.linkedin_url || ''}
                  onChange={(e) => onChange('linkedin_url', e.target.value)}
                  className="pr-12 bg-white border border-black/50 rounded-none
                    focus:border-black focus:ring-0
                    placeholder:text-gray-400
                    font-['Times_New_Roman',_Times,_serif]"
                  placeholder="https://linkedin.com/in/username"
                />
                <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                  LINKEDIN
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="relative group">
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Github className="h-4 w-4 text-black/60" />
              </div>
              <Input
                type="url"
                value={profile.github_url || ''}
                onChange={(e) => onChange('github_url', e.target.value)}
                className="pr-12 bg-white border border-black/50 rounded-none
                  focus:border-black focus:ring-0
                  placeholder:text-gray-400
                  font-['Times_New_Roman',_Times,_serif]"
                placeholder="https://github.com/username"
              />
              <div className="absolute -top-2.5 left-2 px-1 bg-white text-[10px] font-medium text-black uppercase tracking-wider">
                GITHUB
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
