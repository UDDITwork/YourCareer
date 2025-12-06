
import { cn } from "@/lib/utils";

interface MiniResumePreviewProps {
  name: string;
  type: 'base' | 'tailored';
  updatedAt?: string;
  createdAt?: string;
  target_role?: string;
  className?: string;
}

export function MiniResumePreview({
  name,
  type,
  createdAt,
  className
}: MiniResumePreviewProps) {

  function formatDate(dateString?: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  return (
    <div className={cn(
      "relative w-full aspect-[8.5/11]",
      "overflow-hidden",
      "border border-black/50",
      "bg-white",
      "transition-all duration-300",
      "hover:shadow-lg hover:-translate-y-1 hover:border-black",
      "group",
      "font-['Times_New_Roman',_Times,_serif]",
      className
    )}>
      {/* Paper texture effect */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 opacity=%270.05%27/%3E%3C/svg%3E')]" />

      {/* Content Container */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Header Section - Magazine style */}
        <div className="text-center mb-3 pb-2 border-b border-black/20">
          <h3 className="font-bold text-black mb-1 line-clamp-2 uppercase tracking-wide text-sm">
            {name}
          </h3>
          <div className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider border border-black/30 bg-white text-black">
            {type === 'base' ? 'Base Resume' : 'Tailored Resume'}
          </div>
        </div>

        {/* Mock Resume Content - Editorial style */}
        <div className="flex-1 space-y-4">
          {/* Contact Info Section */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={`contact-${i}`}
                className="h-1 bg-black/20 w-12"
              />
            ))}
          </div>

          {/* Summary Section */}
          <div className="space-y-1">
            <div className="h-1.5 w-16 bg-black/40" />
            <div className="space-y-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`summary-${i}`}
                  className={cn(
                    "h-1 bg-black/20",
                    i === 0 && "w-[95%]",
                    i === 1 && "w-[85%]",
                    i === 2 && "w-[90%]"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-1">
            <div className="h-1.5 w-20 bg-black/40" />
            {[...Array(2)].map((_, groupIndex) => (
              <div key={`exp-group-${groupIndex}`} className="py-1 space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1 w-24 bg-black/30" />
                  <div className="h-1 w-16 bg-black/20" />
                </div>
                {[...Array(2)].map((_, i) => (
                  <div
                    key={`exp-${groupIndex}-${i}`}
                    className={cn(
                      "h-1 bg-black/20",
                      groupIndex === 0 && i === 0 && "w-[85%]",
                      groupIndex === 0 && i === 1 && "w-[90%]",
                      groupIndex === 1 && i === 0 && "w-[95%]",
                      groupIndex === 1 && i === 1 && "w-[80%]"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-1">
            <div className="h-1.5 w-14 bg-black/40" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`skill-${i}`}
                  className="h-1 bg-gray-100 w-16 border border-black/20"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer with creation date - Magazine style */}
        {createdAt && (
          <div className="absolute bottom-2 right-2 text-[10px] text-black/60 italic">
            {formatDate(createdAt)}
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300",
        "bg-black/5"
      )} />
    </div>
  );
}
