"use client"
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SplitContent } from '../ui/split-content';
import { AuthDialog } from "@/components/auth/auth-dialog";

const FeatureHighlights = () => {
  // Trusted by logos
  const companies = [
    { name: "Google", logo: "/logos/google.png" },
    { name: "Microsoft", logo: "/logos/microsoft.webp" },
    { name: "Amazon", logo: "/logos/amazon.png" },
    { name: "Meta", logo: "/logos/meta.png" },
    { name: "Netflix", logo: "/logos/netflix.png" },
  ];

  // Statistics counters
  const stats = [
    { value: "500+", label: "Resumes Created" },
    { value: "89%", label: "Interview Rate" },
    { value: "4.9/5", label: "User Rating" },
    { value: "15 min", label: "Average Setup Time" },
  ];

  // Animation variants for scroll reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Redesigned heading section - Magazine editorial style */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Leading badges - 1980s magazine tag style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-3 mb-4"
        >
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
            AI-Powered
          </span>
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
            ATS-Optimized
          </span>
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
            100% Free
          </span>
        </motion.div>

        {/* Heading with magazine typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight font-serif">
            <span className="inline-block text-foreground">
              The Resume Builder
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-block mt-1 text-primary italic"
            >
              That Gets You Hired
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-3 font-body"
          >
            Smart AI tools that optimize your resume for each job, increasing your interview chances by up to <span className="font-semibold text-primary">3x</span>
          </motion.p>
        </motion.div>

        {/* Statistics - Magazine style */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-12 mx-auto mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center relative"
            >
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-3xl md:text-4xl font-bold font-serif text-foreground"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm md:text-base text-muted-foreground mt-1 font-body uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Magazine-style divider */}
        <div className="flex justify-center my-12">
          <div className="w-32 h-[3px] bg-foreground"></div>
          <div className="w-4 h-[3px] bg-primary mx-2"></div>
          <div className="w-32 h-[3px] bg-foreground"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-24 py-24 relative" id="features">
        <SplitContent
          imageSrc="/SS Chat.png"
          heading="AI-Powered Resume Assistant"
          description="Get real-time feedback and suggestions from our advanced AI assistant. Optimize your resume content, improve your bullet points, and ensure your skills stand out to recruiters and ATS systems."
          imageOnLeft={false}
          imageOverflowRight={true}
          badgeText="90% more effective bullets"
          badgeGradient="from-secondary to-secondary"
          bulletPoints={[
            "Smart content suggestions based on your experience",
            "Real-time feedback on your resume",
            "Industry-specific optimization"
          ]}
        />

        <SplitContent
          imageSrc="/Dashboard Image.png"
          heading="Beautiful Resume Dashboard"
          description="Manage all your resumes in one place with our intuitive dashboard. Create base resumes, generate tailored versions for specific jobs, and track your application progress with ease."
          imageOnLeft={true}
          badgeText="Organize your job search"
          badgeGradient="from-secondary to-secondary"
          bulletPoints={[
            "Centralized resume management",
            "Version control for all your resumes",
            "Track application status"
          ]}
        />

        <SplitContent
          imageSrc="/SS Score.png"
          heading="Resume Performance Scoring"
          description="Get detailed insights into your resume's effectiveness with our comprehensive scoring system. Track key metrics, identify areas for improvement, and optimize your resume to stand out to employers and ATS systems."
          imageOnLeft={false}
          imageOverflowRight={true}
          badgeText="3x higher response rates"
          badgeGradient="from-secondary to-secondary"
          bulletPoints={[
            "ATS compatibility scoring",
            "Keyword optimization insights",
            "Detailed improvement recommendations"
          ]}
        />

        <SplitContent
          imageSrc="/SS Cover Letter.png"
          heading="AI Cover Letter Generator"
          description="Create compelling, personalized cover letters in minutes with our AI-powered generator. Tailor your message to specific job opportunities while maintaining a professional and engaging tone that captures attention."
          imageOnLeft={true}
          badgeText="Save 30+ minutes per application"
          badgeGradient="from-secondary to-secondary"
          bulletPoints={[
            "Tailored to match job requirements",
            "Professional tone and structure",
            "Highlights your relevant achievements"
          ]}
        />
      </div>

      {/* Social proof section - Magazine style */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl text-muted-foreground mb-8 font-serif uppercase tracking-wider">Trusted by professionals from companies like</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto opacity-80">
          {companies.map((company, index) => (
            <div key={index} className="w-24 h-12 relative transition-all duration-300 grayscale hover:grayscale-0">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced CTA section - Magazine editorial box */}
      <motion.div
        className="mt-28 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 bg-card border-2 border-foreground shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            <span className="text-foreground">
              Ready to land your dream job?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 font-body">
            Join 50,000+ professionals who are getting more interviews with YourCareer
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthDialog>
              <button
                className="px-8 py-4 bg-primary text-primary-foreground text-lg font-serif font-semibold uppercase tracking-wider border-2 border-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Create Your Free Resume
              </button>
            </AuthDialog>
            <Link
              href="https://github.com/olyaiy/resume-lm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-secondary text-secondary-foreground text-lg font-serif font-medium uppercase tracking-wider border-2 border-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-secondary/80"
            >
              Open Source on Github
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2 font-body">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            No credit card required • 100% free
          </p>
        </div>
      </motion.div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4">
        <AuthDialog>
          <button
            className="flex items-center justify-center w-full py-3.5 bg-primary text-primary-foreground font-serif font-semibold uppercase tracking-wider border-2 border-foreground shadow-lg"
          >
            Get Started Now
          </button>
        </AuthDialog>
      </div>
    </section>
  );
};

export default FeatureHighlights;
