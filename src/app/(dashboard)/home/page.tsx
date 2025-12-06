/**
 * Home Page Component
 *
 * This is the main dashboard page of the Resume AI application. It displays:
 * - User profile information
 * - Quick stats (profile score, resume counts, job postings)
 * - Base resume management
 * - Tailored resume management
 *
 * The page implements a 1980s magazine editorial design with clean typography
 * and warm, vintage color palette.
 */

import { redirect } from "next/navigation";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileRow } from "@/components/dashboard/profile-row";
import { WelcomeDialog } from "@/components/dashboard/welcome-dialog";
import { getGreeting } from "@/lib/utils";
import { ApiKeyAlert } from "@/components/dashboard/api-key-alert";
import { type SortOption, type SortDirection } from "@/components/resume/management/resume-sort-controls";
import type { ResumeSummary } from "@/lib/types";
import { ResumesSection } from "@/components/dashboard/resumes-section";
import { CareerSessionsSection } from "@/components/dashboard/career-sessions-section";
import { getDashboardData } from "@/utils/actions";
import { checkSubscriptionPlan } from "@/utils/actions/stripe/actions";
import { getCareerSessions } from "@/utils/actions/career/actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Check if user is coming from confirmation
  const params = await searchParams;
  const isNewSignup = params?.type === 'signup' && params?.token_hash;

  // Fetch dashboard data and handle authentication
  const fallbackSubscription = {
    plan: '',
    status: '',
    currentPeriodEnd: ''
  };

  let data;
  let subscription: Awaited<ReturnType<typeof checkSubscriptionPlan>> = fallbackSubscription;
  let careerSessions: Awaited<ReturnType<typeof getCareerSessions>> = [];
  try {
    [data, subscription, careerSessions] = await Promise.all([
      getDashboardData(),
      checkSubscriptionPlan().catch(() => fallbackSubscription),
      getCareerSessions().catch(() => [])
    ]);
    if (!data.profile) {
      redirect("/");
    }
  } catch {
    // Redirect to login if error occurs
    redirect("/");
  }

  const { profile, baseResumes: unsortedBaseResumes, tailoredResumes: unsortedTailoredResumes } = data;
  const baseResumesCount = unsortedBaseResumes.length;
  const tailoredResumesCount = unsortedTailoredResumes.length;

  // Get sort parameters for both sections
  const baseSort = (params.baseSort as SortOption) || 'createdAt';
  const baseDirection = (params.baseDirection as SortDirection) || 'asc';
  const tailoredSort = (params.tailoredSort as SortOption) || 'createdAt';
  const tailoredDirection = (params.tailoredDirection as SortDirection) || 'asc';

  // Sort function
  function sortResumes(resumes: ResumeSummary[], sort: SortOption, direction: SortDirection) {
    return [...resumes].sort((a, b) => {
      const modifier = direction === 'asc' ? 1 : -1;
      switch (sort) {
        case 'name':
          return modifier * a.name.localeCompare(b.name);
        case 'jobTitle':
          return modifier * ((a.target_role || '').localeCompare(b.target_role || '') || 0);
        case 'createdAt':
        default:
          return modifier * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    });
  }

  // Sort both resume lists
  const baseResumes = sortResumes(unsortedBaseResumes, baseSort, baseDirection);
  const tailoredResumes = sortResumes(unsortedTailoredResumes, tailoredSort, tailoredDirection);

  // Check if user is on Pro plan
  const isProPlan = subscription.plan === 'pro';

  // Free plan limits
  const canCreateBase = isProPlan || baseResumesCount < 2;
  const canCreateTailored = isProPlan || tailoredResumesCount < 4;

  // Display a friendly message if no profile exists
  if (!profile) {
    return (
      <main className="min-h-screen p-6 md:p-8 lg:p-10 relative flex items-center justify-center bg-white font-['Times_New_Roman',_Times,_serif]">
        <Card className="max-w-md w-full p-8 bg-white border border-black/50 rounded-none shadow-none">
          <div className="text-center space-y-4">
            <User className="w-12 h-12 text-black/60 mx-auto" />
            <h2 className="text-2xl font-bold text-black uppercase tracking-wide">Profile Not Found</h2>
            <p className="text-black/60">
              We couldn&apos;t find your profile information. Please contact support for assistance.
            </p>
            <Button className="w-full bg-black text-white border border-black rounded-none hover:bg-gray-800 uppercase tracking-wider">
              Contact Support
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative sm:pb-12 pb-40 bg-white font-['Times_New_Roman',_Times,_serif]">
      {/* Welcome Dialog for New Signups */}
      <WelcomeDialog isOpen={!!isNewSignup} />

      {/* Content */}
      <div className="relative z-10">
        {/* Profile Row Component */}
        <ProfileRow profile={profile} />

        <div className="pl-2 sm:pl-0 sm:container sm:max-none max-w-7xl mx-auto lg:px-8 md:px-8 sm:px-6 pt-4">
          {/* Profile Overview */}
          <div className="mb-6 space-y-4">
            {/* API Key Alert */}
            {!isProPlan && <ApiKeyAlert />}

            {/* Greeting & Edit Button - Magazine style */}
            <div className="flex items-center justify-between border-b border-black/50 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  {getGreeting()}, <span className="text-black italic">{profile.first_name}</span>
                </h1>
                <p className="text-sm text-black/60 mt-0.5">
                  Welcome to your resume dashboard
                </p>
              </div>
            </div>

            {/* Resume Bookshelf */}
            <div className="">
              {/* Base Resumes Section */}
              <ResumesSection
                type="base"
                resumes={baseResumes}
                profile={profile}
                sortParam="baseSort"
                directionParam="baseDirection"
                currentSort={baseSort}
                currentDirection={baseDirection}
                canCreateMore={canCreateBase}
              />

              {/* Magazine-style Divider */}
              <div className="relative py-4">
                <div className="flex items-center">
                  <div className="flex-1 h-[1px] bg-black/20" />
                  <div className="w-3 h-[1px] bg-black mx-2" />
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>
              </div>

              {/* Tailored Resumes Section */}
              <ResumesSection
                type="tailored"
                resumes={tailoredResumes}
                profile={profile}
                sortParam="tailoredSort"
                directionParam="tailoredDirection"
                currentSort={tailoredSort}
                currentDirection={tailoredDirection}
                baseResumes={baseResumes}
                canCreateMore={canCreateTailored}
              />

              {/* Magazine-style Divider */}
              <div className="relative py-4">
                <div className="flex items-center">
                  <div className="flex-1 h-[1px] bg-black/20" />
                  <div className="w-3 h-[1px] bg-black mx-2" />
                  <div className="flex-1 h-[1px] bg-black/20" />
                </div>
              </div>

              {/* Career Counselling Section */}
              <CareerSessionsSection sessions={careerSessions} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
