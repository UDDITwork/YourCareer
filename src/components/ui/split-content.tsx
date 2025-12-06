import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface SplitContentProps {
  imageSrc: string;
  heading: string;
  description: string;
  imageOnLeft?: boolean;
  imageOverflowRight?: boolean;
  className?: string;
  children?: React.ReactNode;
  bulletPoints?: string[];
  badgeText?: string;
  badgeGradient?: string;
}

export function SplitContent({
  imageSrc,
  heading,
  description,
  imageOnLeft = true,
  imageOverflowRight = false,
  className,
  children,
  bulletPoints,
  badgeText,
}: SplitContentProps) {
  return (
    <div className={cn(
      "relative w-full overflow-hidden",
      className
    )}>
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "grid gap-12 lg:gap-8 items-center",
          "lg:grid-cols-5"
        )}>
          {/* Content Section - Magazine Editorial Style */}
          {imageOverflowRight && (
            <div className={cn(
              "relative flex flex-col gap-8 lg:col-span-2",
              "lg:pl-16 text-right",
              "order-first lg:order-none"
            )}>
              {/* Badge - Magazine tag style */}
              {badgeText && (
                <div className="inline-block self-end px-4 py-1 bg-secondary text-foreground text-sm font-serif uppercase tracking-wider border-2 border-foreground mb-1">
                  {badgeText}
                </div>
              )}

              {/* Enhanced heading - Magazine typography */}
              <div className="space-y-2 inline-flex flex-col items-end w-full">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
                  {heading}
                </h2>
                <div className="h-[3px] w-24 bg-primary" />
              </div>

              {/* Enhanced description */}
              <p className="text-xl text-muted-foreground leading-relaxed font-body">
                {description}
              </p>

              {/* Bullet points - Editorial style */}
              {bulletPoints && bulletPoints.length > 0 && (
                <div className="space-y-2 flex flex-col items-end">
                  {bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 flex-row-reverse">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-right font-body">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional children */}
              {children && (
                <div className="mt-4">
                  {children}
                </div>
              )}
            </div>
          )}

          {/* Image Section - Magazine photo style */}
          <div className={cn(
            "relative group lg:col-span-3",
            imageOverflowRight ? "w-[140%]" : "w-[140%] -ml-[40%]",
            "aspect-[16/10]",
            "order-last lg:order-none"
          )}>
            <div className="relative h-full w-full overflow-hidden border-2 border-foreground shadow-lg">
              <div className="relative h-full w-full p-2">
                <Image
                  src={imageSrc}
                  alt={heading}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                  sizes="(min-width: 1440px) 50vw, (min-width: 1024px) 60vw, (min-width: 768px) 80vw, 100vw"
                  quality={100}
                  priority
                  loading="eager"
                  style={{
                    objectFit: 'cover',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Section - Left side variant */}
          {!imageOverflowRight && (
            <div className={cn(
              "relative flex flex-col gap-8 lg:col-span-2",
              imageOnLeft ? "lg:pl-16" : "lg:pr-16",
              "order-first lg:order-none"
            )}>
              {/* Badge - Magazine tag style */}
              {badgeText && (
                <div className="inline-block px-4 py-1 bg-secondary text-foreground text-sm font-serif uppercase tracking-wider border-2 border-foreground mb-1 w-fit">
                  {badgeText}
                </div>
              )}

              {/* Enhanced heading - Magazine typography */}
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
                  {heading}
                </h2>
                <div className="h-[3px] w-24 bg-primary" />
              </div>

              {/* Enhanced description */}
              <p className="text-xl text-muted-foreground leading-relaxed font-body">
                {description}
              </p>

              {/* Bullet points - Editorial style */}
              {bulletPoints && bulletPoints.length > 0 && (
                <div className="space-y-2">
                  {bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-body">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional children */}
              {children && (
                <div className="mt-4">
                  {children}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
