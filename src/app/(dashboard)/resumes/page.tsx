import { getDashboardData } from "@/utils/actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MiniResumePreview } from "@/components/resume/shared/mini-resume-preview";
import { ResumeSortControls } from "@/components/resume/management/resume-sort-controls";
import type { SortOption, SortDirection } from "@/components/resume/management/resume-sort-controls";

const RESUMES_PER_PAGE = 12;

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function ResumesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams;

  const { baseResumes, tailoredResumes } = await getDashboardData();

  // Combine and sort resumes
  const allResumes = [...baseResumes, ...tailoredResumes];
  const currentPage = Number(params.page) || 1;
  const sort = (params.sort as SortOption) || 'createdAt';
  const direction = (params.direction as SortDirection) || 'desc';

  // Sort resumes
  const sortedResumes = allResumes.sort((a, b) => {
    const modifier = direction === 'asc' ? 1 : -1;
    switch (sort) {
      case 'name':
        return modifier * a.name.localeCompare(b.name);
      case 'jobTitle':
        return modifier * (a.target_role?.localeCompare(b.target_role || '') || 0);
      case 'createdAt':
      default:
        return modifier * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  });

  // Paginate resumes
  const totalPages = Math.ceil(sortedResumes.length / RESUMES_PER_PAGE);
  const paginatedResumes = sortedResumes.slice(
    (currentPage - 1) * RESUMES_PER_PAGE,
    currentPage * RESUMES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Header with controls - Magazine editorial style */}
        <div className="flex items-center justify-between border-b-2 border-foreground pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-foreground uppercase">
              My Resumes
            </h1>
            <p className="text-muted-foreground font-body italic">
              Manage all your resumes in one place
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Suspense>
              <ResumeSortControls />
            </Suspense>
            <Link
              href="/resumes/new"
              className={cn(
                "inline-flex items-center justify-center",
                "text-sm font-serif font-semibold uppercase tracking-wider",
                "transition-all duration-300",
                "bg-primary text-primary-foreground",
                "border-2 border-foreground",
                "hover:shadow-lg hover:-translate-y-0.5",
                "h-10 px-6"
              )}
            >
              Create Resume
            </Link>
          </div>
        </div>

        {/* Resumes Grid - Magazine layout */}
        <div className="relative bg-card border-2 border-foreground shadow-lg">
          <Suspense fallback={<ResumesLoadingSkeleton />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
              {paginatedResumes.map((resume) => (
                <Link href={`/resumes/${resume.id}`} key={resume.id}>
                  <MiniResumePreview
                    name={resume.name}
                    type={resume.is_base_resume ? 'base' : 'tailored'}
                    target_role={resume.target_role}
                    updatedAt={resume.updated_at}
                    className="hover:-translate-y-1 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Pagination - Magazine page numbers */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}&sort=${sort}&direction=${direction}`}
                className={cn(
                  "px-4 py-2 transition-colors font-serif border-2",
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground border-foreground"
                    : "bg-card border-border hover:border-foreground"
                )}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResumesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton
          key={i}
          className="w-full aspect-[8.5/11] bg-secondary border-2 border-border"
        />
      ))}
    </div>
  );
}
