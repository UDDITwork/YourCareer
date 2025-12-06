import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { AuthDialog } from "@/components/auth/auth-dialog";

export function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-12 md:py-16 lg:py-20">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 space-y-8">
        {/* Product Hunt Badge */}
        <div className="flex justify-start">
          <a
            href="https://www.producthunt.com/products/resumelm?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-resumelm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=982199&theme=light&t=1750633039421"
              alt="ResumeLM - Open Source AI Resume Builder for Tech Jobs | Product Hunt"
              width={250}
              height={54}
            />
          </a>
        </div>

        {/* Tagline - 1980s Magazine Style */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif">
          <span className="block">Open Source</span>
          <span className="block text-primary italic">AI Resume Builder</span>
          <span className="block">That Lands You Tech Jobs</span>
        </h1>

        {/* Description - Editorial style */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-md font-body leading-relaxed">
          Create ATS-optimized tech resumes in under 10 minutes. 3x your interview chances with AI-powered resume tailoring.
        </p>

        {/* CTAs - Magazine button style */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <AuthDialog>
            <button
              className="px-6 py-3 bg-primary text-primary-foreground font-serif font-semibold uppercase tracking-wider border-2 border-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              aria-label="Create your resume now"
            >
              <span>Create Resume</span>
              <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </AuthDialog>
          <Link
            href="https://github.com/UDDITwork"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-secondary text-secondary-foreground border-2 border-foreground font-serif font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/80"
            aria-label="View source code on GitHub"
          >
            Open Source on Github
          </Link>
        </div>

        {/* Feature badges - Magazine tag style */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">AI-Powered</span>
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">ATS-Optimized</span>
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">100% Free</span>
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">Privacy-First</span>
        </div>

        {/* Social proof section - Magazine testimonial style */}
        <div className="mt-8">
          <div className="flex items-center p-4 bg-card border-2 border-foreground transition-all duration-300 hover:-translate-y-1">
            {/* Stats highlight */}
            <div className="flex-shrink-0 mr-5">
              <div className="flex items-center justify-center h-16 w-16 bg-primary text-primary-foreground border-2 border-foreground">
                <span className="text-2xl font-bold font-serif">500+</span>
              </div>
            </div>

            {/* Text content with testimonial */}
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-base uppercase tracking-wide">Join Our Growing Community</h3>
              <p className="text-sm text-muted-foreground font-body">Trusted by over 500 tech professionals</p>

              <p className="text-xs italic mt-1 text-primary font-body">&ldquo;Landed 3 interviews in my first week using YourCareer&rdquo; — Sarah K.</p>

              {/* Avatar stack */}
              <div className="flex items-center mt-3">
                <div className="flex -space-x-2 mr-3">
                  <Avatar className="h-7 w-7 border-2 border-foreground">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-serif">JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-7 w-7 border-2 border-foreground">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-serif">SR</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-7 w-7 border-2 border-foreground">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-serif">KL</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-7 w-7 border-2 border-foreground">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-serif">MP</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-7 w-7 border-2 border-foreground">
                    <AvatarFallback className="bg-card text-xs text-primary font-serif font-medium">496+</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground font-body italic">Active this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Magazine-style resume mockups */}
      <div className="w-full lg:w-1/2 relative">
        {/* Main resume mockup - Editorial look */}
        <div className="relative w-full aspect-[3/4] bg-card border-2 border-foreground shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
          {/* Resume header - Burgundy accent */}
          <div className="absolute top-0 left-0 w-full h-[15%] bg-primary">
            <div className="absolute top-6 left-8 w-[50%] h-[20%] bg-primary-foreground"></div>
            <div className="absolute bottom-0 left-8 w-[30%] h-[20%] bg-primary-foreground/80"></div>
          </div>

          {/* Resume content - Sepia tones */}
          <div className="absolute top-[20%] left-8 w-[80%] h-[4%] bg-border"></div>
          <div className="absolute top-[26%] left-8 w-[60%] h-[3%] bg-border"></div>
          <div className="absolute top-[30%] left-8 w-[70%] h-[3%] bg-border"></div>

          {/* Experience Section */}
          <div className="absolute top-[36%] left-8 w-[35%] h-[4%] bg-secondary"></div>
          <div className="absolute top-[42%] left-8 w-[80%] h-[3%] bg-border"></div>
          <div className="absolute top-[46%] left-8 w-[75%] h-[3%] bg-border"></div>
          <div className="absolute top-[50%] left-8 w-[70%] h-[3%] bg-border"></div>

          {/* Skills Section */}
          <div className="absolute top-[56%] left-8 w-[35%] h-[4%] bg-secondary"></div>
          <div className="absolute top-[62%] right-8 flex flex-wrap gap-2 w-[80%]">
            <div className="h-[12px] w-[60px] bg-secondary border border-foreground/20"></div>
            <div className="h-[12px] w-[70px] bg-secondary border border-foreground/20"></div>
            <div className="h-[12px] w-[50px] bg-muted border border-foreground/20"></div>
            <div className="h-[12px] w-[80px] bg-secondary border border-foreground/20"></div>
            <div className="h-[12px] w-[65px] bg-muted border border-foreground/20"></div>
          </div>

          {/* Education Section */}
          <div className="absolute top-[70%] left-8 w-[35%] h-[4%] bg-secondary"></div>
          <div className="absolute top-[76%] left-8 w-[80%] h-[3%] bg-border"></div>
          <div className="absolute top-[80%] left-8 w-[75%] h-[3%] bg-border"></div>
          <div className="absolute top-[84%] left-8 w-[70%] h-[3%] bg-border"></div>

          {/* AI optimization indicator */}
          <div className="absolute bottom-4 right-4 px-2 py-1 bg-secondary border-2 border-foreground text-[10px] text-foreground font-serif uppercase tracking-wide">
            AI Optimized
          </div>
        </div>

        {/* Tailored resume variant */}
        <div className="absolute -bottom-12 -left-8 w-[40%] aspect-[3/4] bg-card border-2 border-foreground shadow-lg overflow-hidden rotate-[-8deg] z-10 transition-all duration-300 hover:rotate-[-4deg]">
          <div className="w-full h-[10%] bg-accent">
            <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-accent-foreground/80"></div>
          </div>
          <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1">
            <div className="h-[8px] w-[80%] bg-border"></div>
            <div className="h-[8px] w-[70%] bg-border"></div>
            <div className="mt-2 h-[8px] w-[50%] bg-secondary"></div>
            <div className="h-[8px] w-[80%] bg-border"></div>
            <div className="h-[8px] w-[75%] bg-border"></div>
          </div>
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-secondary border border-foreground text-[8px] text-foreground font-serif uppercase">
            Tailored
          </div>
        </div>

        {/* Technical role variant */}
        <div className="absolute -top-10 -right-6 w-[40%] aspect-[3/4] bg-card border-2 border-foreground shadow-lg overflow-hidden rotate-[8deg] z-10 transition-all duration-300 hover:rotate-[4deg]">
          <div className="w-full h-[10%] bg-muted-foreground">
            <div className="absolute top-2 left-2 w-[40%] h-[5%] bg-background/80"></div>
          </div>
          <div className="absolute top-[15%] left-2 right-2 h-[80%] flex flex-col gap-1">
            <div className="h-[8px] w-[80%] bg-border"></div>
            <div className="h-[8px] w-[70%] bg-border"></div>
            <div className="mt-2 h-[8px] w-[50%] bg-secondary"></div>
            <div className="h-[8px] w-[80%] bg-border"></div>
            <div className="h-[8px] w-[75%] bg-border"></div>
          </div>
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-secondary border border-foreground text-[8px] text-foreground font-serif uppercase">
            Technical
          </div>
        </div>
      </div>
    </section>
  );
}
