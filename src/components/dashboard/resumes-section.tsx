'use client';

import { Trash2, Copy, FileText, Sparkles, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { MiniResumePreview } from '@/components/resume/shared/mini-resume-preview';
import { CreateResumeDialog } from '@/components/resume/management/dialogs/create-resume-dialog';
import { ResumeSortControls, type SortOption, type SortDirection } from '@/components/resume/management/resume-sort-controls';
import type { Profile, ResumeSummary } from '@/lib/types';
import { deleteResume, copyResume } from '@/utils/actions/resumes/actions';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { useState, useOptimistic, useTransition } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { toast } from 'sonner';

// Extended Resume type for optimistic updates
interface OptimisticResume extends ResumeSummary {
  isOptimistic?: boolean;
  originalId?: string;
}

interface ResumesSectionProps {
  type: 'base' | 'tailored';
  resumes: ResumeSummary[];
  profile: Profile;
  sortParam: string;
  directionParam: string;
  currentSort: SortOption;
  currentDirection: SortDirection;
  baseResumes?: ResumeSummary[]; // Only needed for tailored type
  canCreateMore?: boolean;
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export function ResumesSection({ 
  type,
  resumes,
  profile,
  sortParam,
  directionParam,
  currentSort,
  currentDirection,
  baseResumes = [],
  canCreateMore
}: ResumesSectionProps) {
  // Optimistic state for deletions
  const [optimisticResumes, removeOptimisticResume] = useOptimistic(
    resumes as OptimisticResume[],
    (state, deletedResumeId: string) => 
      state.filter(resume => resume.id !== deletedResumeId)
  );

  // Optimistic state for copying
  const [optimisticCopiedResumes, addOptimisticCopy] = useOptimistic(
    optimisticResumes,
    (state, newResume: OptimisticResume) => {
      // Always add new resume at the beginning (leftmost position)
      return [newResume, ...state];
    }
  );

  const [, startTransition] = useTransition();
  const [deletingResumes, setDeletingResumes] = useState<Set<string>>(new Set());
  const [copyingResumes, setCopyingResumes] = useState<Set<string>>(new Set());

  const config = {
    base: {
      border: 'border-black/50',
      bg: 'bg-white',
      text: 'text-black',
      icon: FileText,
      accent: {
        bg: 'white',
        hover: 'gray-50'
      }
    },
    tailored: {
      border: 'border-black/50',
      bg: 'bg-white',
      text: 'text-black',
      icon: Sparkles,
      accent: {
        bg: 'white',
        hover: 'gray-50'
      }
    }
  }[type];

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 7
  });

  // Handle optimistic deletion
  const handleDeleteResume = async (resumeId: string, resumeName: string) => {
    // Add to deleting set for visual feedback
    setDeletingResumes(prev => new Set(prev).add(resumeId));
    
    // Optimistically remove from UI immediately
    removeOptimisticResume(resumeId);
    
    // Show immediate feedback
    toast.loading(`Deleting "${resumeName}"...`, { id: resumeId });
    
    try {
      // Call server action in background
      await deleteResume(resumeId);
      
      // Success feedback
      toast.success(`"${resumeName}" deleted successfully`, { id: resumeId });
    } catch (error) {
      // On error, the optimistic update will automatically rollback
      console.error('Failed to delete resume:', error);
      toast.error(`Failed to delete "${resumeName}". Please try again.`, { id: resumeId });
    } finally {
      // Remove from deleting set
      setDeletingResumes(prev => {
        const newSet = new Set(prev);
        newSet.delete(resumeId);
        return newSet;
      });
    }
  };

  // Handle optimistic copying
  const handleCopyResume = async (sourceResume: OptimisticResume) => {
    // Add to copying set for visual feedback
    setCopyingResumes(prev => new Set(prev).add(sourceResume.id));
    
    // Create optimistic copy
    const optimisticCopy: OptimisticResume = {
      ...sourceResume,
      id: `temp-${Date.now()}-${Math.random()}`, // Temporary unique ID
      name: `${sourceResume.name} (Copy)`,
      isOptimistic: true,
      originalId: sourceResume.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Optimistically add to UI immediately
    addOptimisticCopy(optimisticCopy);
    
    // Show immediate feedback
    toast.loading(`Copying "${sourceResume.name}"...`, { id: `copy-${sourceResume.id}` });
    
    try {
      // Call server action in background
      await copyResume(sourceResume.id);
      
      // Success feedback - the real resume will appear via revalidation
      toast.success(`"${sourceResume.name}" copied successfully`, { id: `copy-${sourceResume.id}` });
    } catch (error) {
      // On error, the optimistic update will automatically rollback
      console.error('Failed to copy resume:', error);
      toast.error(`Failed to copy "${sourceResume.name}". Please try again.`, { id: `copy-${sourceResume.id}` });
    } finally {
      // Remove from copying set
      setCopyingResumes(prev => {
        const newSet = new Set(prev);
        newSet.delete(sourceResume.id);
        return newSet;
      });
    }
  };

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedResumes = optimisticCopiedResumes.slice(startIndex, endIndex);

  function handlePageChange(page: number) {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  }

  // Create Resume Card Component - Magazine style
  const CreateResumeCard = () => (
    <CreateResumeDialog
      type={type}
      profile={profile}
      {...(type === 'tailored' && { baseResumes })}
    >
      <button className={cn(
        "aspect-[8.5/11]",
        "relative overflow-hidden",
        "border border-dashed transition-all duration-300",
        "group/new-resume flex flex-col items-center justify-center gap-4",
        "border-black/50 hover:border-black",
        "bg-white",
        "hover:shadow-lg hover:-translate-y-1",
        "w-full sm:w-auto mr-8 sm:mr-0",
        "font-['Times_New_Roman',_Times,_serif]"
      )}>
        <div className={cn(
          "relative z-10 flex flex-col items-center",
          "transform transition-all duration-300",
          "group-hover/new-resume:scale-105"
        )}>
          <div className={cn(
            "h-12 w-12 border border-black/50",
            "flex items-center justify-center",
            "transform transition-all duration-300",
            "bg-white",
            "group-hover/new-resume:scale-110"
          )}>
            <config.icon className={cn(
              "h-5 w-5 transition-all duration-300",
              "text-black",
              "group-hover/new-resume:scale-110"
            )} />
          </div>

          <span className={cn(
            "mt-4 text-sm font-medium uppercase tracking-wide",
            "transition-all duration-300",
            "text-black",
            "group-hover/new-resume:font-semibold"
          )}>
            Create {type === 'base' ? 'Base' : 'Tailored'} Resume
          </span>

          <span className={cn(
            "mt-2 text-xs",
            "transition-all duration-300 opacity-0",
            "text-black/60",
            "group-hover/new-resume:opacity-70"
          )}>
            Click to start
          </span>
        </div>
      </button>
    </CreateResumeDialog>
  );

  // Limit Reached Card Component - Magazine style
  const LimitReachedCard = () => (
    <Link
      href="/subscription"
      className={cn(
        "group/limit block",
        "cursor-pointer",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "font-['Times_New_Roman',_Times,_serif]"
      )}
    >
      <div className={cn(
        "aspect-[8.5/11]",
        "relative overflow-hidden",
        "border border-dashed",
        "flex flex-col items-center justify-center gap-4",
        "border-black/50",
        "bg-white",
        "transition-all duration-300",
        "hover:shadow-lg",
        "hover:border-black"
      )}>
        <div className={cn(
          "relative z-10 flex flex-col items-center",
          "transform transition-all duration-300",
          "group-hover/limit:scale-105"
        )}>
          <div className={cn(
            "h-12 w-12 border",
            "flex items-center justify-center",
            "bg-white border-black/50",
            "text-black",
            "transition-all duration-300",
            "group-hover/limit:border-black",
            "group-hover/limit:-translate-y-1"
          )}>
            <config.icon className={cn(
              "h-5 w-5",
              "transition-all duration-300",
              "group-hover/limit:scale-110"
            )} />
          </div>
          <span className={cn(
            "mt-4 text-sm font-medium uppercase tracking-wide",
            "text-black",
            "transition-all duration-300"
          )}>
            {type === 'base' ? 'Base' : 'Tailored'} Limit Reached
          </span>
          <span className={cn(
            "mt-2 text-xs",
            "text-black/60",
            "underline underline-offset-4",
            "transition-all duration-300",
            "group-hover/limit:text-black"
          )}>
            Upgrade to create more
          </span>
        </div>
      </div>
    </Link>
  );

  // Resume Card Component with optimistic states - Magazine style
  const ResumeCard = ({ resume }: { resume: OptimisticResume }) => {
    const isDeleting = deletingResumes.has(resume.id);
    const isCopying = copyingResumes.has(resume.originalId || resume.id);

    return (
      <div className={cn(
        "group relative transition-all duration-300 font-['Times_New_Roman',_Times,_serif]",
        isDeleting && "opacity-50 pointer-events-none",
        resume.isOptimistic && "animate-in slide-in-from-top-1 duration-300"
      )}>
        <AlertDialog>
          <div className="relative">
            {/* Resume Preview - Conditional Link */}
            {resume.isOptimistic ? (
              // Not clickable during processing
              <div className={cn(
                "cursor-wait",
                "relative"
              )}>
                <MiniResumePreview
                  name={resume.name}
                  type={type}
                  target_role={resume.target_role}
                  createdAt={resume.created_at}
                  className={cn(
                    "transition-all duration-300 opacity-60",
                    "pointer-events-none"
                  )}
                />
                {/* Loading Overlay - Magazine style */}
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10 border border-black/50">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span className="text-xs font-medium text-black uppercase tracking-wide">Copying...</span>
                  </div>
                </div>
              </div>
            ) : (
              // Normal clickable resume
              <Link href={`/resumes/${resume.id}`}>
                <MiniResumePreview
                  name={resume.name}
                  type={type}
                  target_role={resume.target_role}
                  createdAt={resume.created_at}
                  className="hover:-translate-y-1 transition-transform duration-300"
                />
              </Link>
            )}

            {/* Action Buttons - Magazine style */}
            {!resume.isOptimistic && (
              <div className="absolute bottom-2 left-2 flex gap-2">
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isDeleting}
                    className={cn(
                      "h-8 w-8 rounded-none",
                      "bg-white hover:bg-gray-100",
                      "text-black hover:text-black",
                      "border border-black/50 hover:border-black",
                      "transition-all duration-300",
                      "hover:scale-105",
                      "hover:-translate-y-0.5",
                      isDeleting && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>

                {/* Copy Button - Check if can create more */}
                {canCreateMore ? (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      startTransition(() => {
                        handleCopyResume(resume);
                      });
                    }}
                    disabled={isDeleting || isCopying}
                    className={cn(
                      "h-8 w-8 rounded-none",
                      "bg-white hover:bg-gray-100",
                      "text-black",
                      "border border-black/50 hover:border-black",
                      "transition-all duration-300",
                      "hover:scale-105",
                      "hover:-translate-y-0.5",
                      (isDeleting || isCopying) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {isCopying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "h-8 w-8 rounded-none",
                          "bg-white hover:bg-gray-100",
                          "text-black",
                          "border border-black/50 hover:border-black",
                          "transition-all duration-300",
                          "hover:scale-105",
                          "hover:-translate-y-0.5"
                        )}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white border border-black/50 rounded-none font-['Times_New_Roman',_Times,_serif]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-black">Upgrade Required</AlertDialogTitle>
                        <AlertDialogDescription className="text-black/60">
                          You&apos;ve reached the maximum number of {type} resumes allowed on the free plan.
                          Upgrade to Pro to create unlimited resumes and unlock additional features.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white border border-black/50 rounded-none text-black hover:bg-gray-50">Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Link href="/subscription" className="bg-black text-white hover:bg-gray-800 border border-black rounded-none">
                            Upgrade to Pro
                          </Link>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            )}
          </div>
          <AlertDialogContent className="bg-white border border-black/50 rounded-none font-['Times_New_Roman',_Times,_serif]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-black">Delete Resume</AlertDialogTitle>
              <AlertDialogDescription className="text-black/60">
                Are you sure you want to delete &quot;{resume.name}&quot;? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white border border-black/50 rounded-none text-black hover:bg-gray-50">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  startTransition(() => {
                    handleDeleteResume(resume.id, resume.name);
                  });
                }}
                className="bg-black text-white hover:bg-gray-800 rounded-none"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

  return (
    <div className="relative font-['Times_New_Roman',_Times,_serif]">
      <div className="flex flex-col gap-4 w-full">
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Magazine-style section heading */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-black">
            {type === 'base' ? 'Base' : 'Tailored'} Resumes
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <ResumeSortControls
              sortParam={sortParam}
              directionParam={directionParam}
              currentSort={currentSort}
              currentDirection={currentDirection}
            />
          </div>
        </div>

        {/* Desktop Pagination (hidden on mobile) */}
        {optimisticCopiedResumes.length > pagination.itemsPerPage && (
          <div className="hidden md:flex w-full items-start justify-start -mt-4">
            <Pagination className="flex justify-end">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="h-8 w-8 p-0 text-black/60 hover:text-black rounded-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>

                {Array.from({ length: Math.ceil(optimisticCopiedResumes.length / pagination.itemsPerPage) }).map((_, index) => {
                  const pageNumber = index + 1;
                  const totalPages = Math.ceil(optimisticCopiedResumes.length / pagination.itemsPerPage);

                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= pagination.currentPage - 1 && pageNumber <= pagination.currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={cn(
                            "h-8 w-8 p-0 rounded-none",
                            "text-black/60 hover:text-black",
                            pagination.currentPage === pageNumber && "font-medium text-black"
                          )}
                        >
                          {pageNumber}
                        </Button>
                      </PaginationItem>
                    );
                  }

                  if (
                    pageNumber === 2 && pagination.currentPage > 3 ||
                    pageNumber === totalPages - 1 && pagination.currentPage < totalPages - 2
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <span className="text-black/60 px-2">...</span>
                      </PaginationItem>
                    );
                  }

                  return null;
                })}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === Math.ceil(optimisticCopiedResumes.length / pagination.itemsPerPage)}
                    className="h-8 w-8 p-0 text-black/60 hover:text-black rounded-none"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <div className="relative pb-6">
        {/* Mobile View */}
        <div className="md:hidden w-full space-y-6">
          {/* Mobile Create Resume Button Row */}
          {canCreateMore ? (
            <div className="px-2 w-full  flex">
              <CreateResumeCard />
            </div>
          ) : (
            <div className="px-4 w-full">
              <LimitReachedCard />
            </div>
          )}

          {/* Mobile Resumes Carousel */}
          {paginatedResumes.length > 0 && (
            <div className="w-full">
              <Carousel className="w-full">
                <CarouselContent>
                  {paginatedResumes.map((resume) => (
                    <CarouselItem key={resume.id} className="basis-[85%] pl-4">
                      <ResumeCard resume={resume} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden sm:block">
                  <CarouselPrevious className="absolute -left-12 top-1/2" />
                  <CarouselNext className="absolute -right-12 top-1/2" />
                </div>
              </Carousel>
            </div>
          )}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {canCreateMore ? (
            <CreateResumeCard />
          ) : (
            <LimitReachedCard />
          )}

          {paginatedResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
          {optimisticCopiedResumes.length === 0 && optimisticCopiedResumes.length + 1 < 4 && (
            <div className="col-span-2 md:col-span-1" />
          )}
        </div>
      </div>
    </div>
  );
} 
