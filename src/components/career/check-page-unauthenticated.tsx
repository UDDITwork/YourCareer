'use client';

import { motion } from "framer-motion";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react";

export function CheckPageUnauthenticated() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Vintage Magazine Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://t3.ftcdn.net/jpg/16/45/84/38/360_F_1645843834_4r5DRuI5C3LeQbuPKmHGQ8uKqvSnP4ej.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Vintage overlay effects for old magazine vibes */}
        <div className="absolute inset-0 bg-[rgba(139,90,43,0.15)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-[rgba(101,67,33,0.1)] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(139,90,43,0.05)] via-transparent to-[rgba(101,67,33,0.1)]" />
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,90,43,0.03) 2px, rgba(139,90,43,0.03) 4px)',
        }} />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Subtle grid overlay on top of background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Content backdrop with vintage paper effect */}
          <div className="absolute inset-0 -mx-4 -my-12 bg-[rgba(250,245,235,0.85)] backdrop-blur-sm rounded-lg shadow-2xl border-2 border-[rgba(139,90,43,0.2)]" 
            style={{
              boxShadow: 'inset 0 0 50px rgba(139,90,43,0.1), 0 10px 40px rgba(0,0,0,0.2)',
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 relative z-10"
          >
            <div className="flex justify-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[rgba(250,245,235,0.9)] text-[#8B5A2B] text-sm border-2 border-[rgba(139,90,43,0.4)] font-serif uppercase tracking-wide shadow-md">
                AI-Powered
              </span>
              <span className="px-3 py-1 bg-[rgba(250,245,235,0.9)] text-[#8B5A2B] text-sm border-2 border-[rgba(139,90,43,0.4)] font-serif uppercase tracking-wide shadow-md">
                Personalized
              </span>
              <span className="px-3 py-1 bg-[rgba(250,245,235,0.9)] text-[#8B5A2B] text-sm border-2 border-[rgba(139,90,43,0.4)] font-serif uppercase tracking-wide shadow-md">
                Free
              </span>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <GraduationCap className="h-16 w-16 md:h-20 md:w-20 text-[#8B5A2B] drop-shadow-lg" />
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-[#A0826D] absolute -top-2 -right-2 animate-pulse drop-shadow-md" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#654321] mb-4 drop-shadow-lg">
              Career Counselling Assistant
            </h1>
            <p className="text-lg md:text-xl text-[#5C4033] mb-8 max-w-2xl mx-auto font-body drop-shadow-sm">
              Get personalized career guidance tailored to your education level, interests, and goals.
              Part of the <span className="font-semibold text-[#8B5A2B]">YourCareer</span> ecosystem.
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <AuthDialog>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-[#8B5A2B] via-[#A0826D] to-[#8B5A2B] text-[#FAF5EB] font-semibold 
                    text-lg py-6 px-10 shadow-xl shadow-[rgba(139,90,43,0.4)] hover:shadow-[rgba(139,90,43,0.5)]
                    ring-2 ring-[rgba(139,90,43,0.3)] hover:ring-[rgba(139,90,43,0.5)]
                    scale-105 hover:scale-110 transition-all duration-300
                    rounded-xl group border-2 border-[rgba(139,90,43,0.4)]"
                  >
                    <span className="flex items-center justify-center">
                      Get Started Free
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </AuthDialog>
              </div>
              <p className="text-sm text-[#5C4033] drop-shadow-sm">
                No credit card required • Free forever • Start in seconds
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12 relative z-10"
          >
            <div className="p-6 rounded-lg border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-[#654321]">Personalized Guidance</h3>
              <p className="text-sm text-[#5C4033]">
                Get career advice tailored to your academic level, board, and interests
              </p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-[#654321]">AI-Powered Insights</h3>
              <p className="text-sm text-[#5C4033]">
                Advanced AI analyzes your profile and provides actionable career paths
              </p>
            </div>
            <div className="p-6 rounded-lg border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-[#654321]">Free Forever</h3>
              <p className="text-sm text-[#5C4033]">
                No hidden costs, no subscriptions. Get started completely free
              </p>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-center relative z-10"
          >
            <h2 className="text-2xl font-semibold mb-6 text-[#654321] drop-shadow-sm">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5A2B] text-[#FAF5EB] font-bold shadow-md">
                    1
                  </div>
                  <h3 className="font-semibold text-[#654321]">Sign Up Free</h3>
                </div>
                <p className="text-sm text-[#5C4033] ml-11">
                  Create your account in seconds with just your email
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5A2B] text-[#FAF5EB] font-bold shadow-md">
                    2
                  </div>
                  <h3 className="font-semibold text-[#654321]">Chat with AI</h3>
                </div>
                <p className="text-sm text-[#5C4033] ml-11">
                  Answer a few questions about your education and goals
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B5A2B] text-[#FAF5EB] font-bold shadow-md">
                    3
                  </div>
                  <h3 className="font-semibold text-[#654321]">Get Your Plan</h3>
                </div>
                <p className="text-sm text-[#5C4033] ml-11">
                  Receive a personalized career roadmap and recommendations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

