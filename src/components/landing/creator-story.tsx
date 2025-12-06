"use client"
import { motion } from "framer-motion";
import Image from "next/image";

export function CreatorStory() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden" id="creator-story">
      {/* Simplified background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber-100/10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-100/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading with simplified styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm text-amber-800 inline-block mb-4"
          >
            The Story Behind YourCareer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-amber-800">
            Meet the Creator
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-[400px_1fr] gap-10 items-center"
        >
          {/* Image Area with simplified styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mx-auto md:mx-0"
          >
            <div className="relative aspect-square w-64 md:w-96 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 shadow-md transform transition-all duration-300 hover:-translate-y-2">
              <Image
                src="/uddit.webp"
                alt="Uddit, creator of YourCareer"
                fill
                sizes="(max-width: 768px) 256px, 384px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Story Content with simplified styling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-amber-900">
                Why I Built YourCareer
              </h2>

              <div className="space-y-4 text-lg text-slate-800 leading-relaxed">
                <p>
                  Hi, I&apos;m Uddit! I&apos;m an AI Engineer with experience in &quot;Patents in AI&quot;,
                  and like many students, I&apos;ve been through the challenging journey of searching for tech internships.
                </p>

                <p>
                  This is not my passion project - a free, closed-source resume builder designed to help students and developers
                  create ATS-optimized resumes without the hefty subscription costs. Because everyone deserves access to great tools.
                  It is an early stage extension of my personal AI ASSISTANT &quot;Shree&quot; that will be at par with JARVIS.
                </p>

                <div className="flex gap-6 pt-4">
                  <motion.a
                    href="https://linkedin.com/in/lorduddit-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href="https://github.com/UDDITwork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </motion.a>
                  <motion.a
                    href="https://uddit.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 transition-all duration-300 hover:-translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Website
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 