'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { WorldMapBackground } from "./world-map-background";
import { CareerPathTree } from "./career-path-tree";

export function CheckPageUnauthenticated() {
  const [showTree, setShowTree] = useState(false);
  const [mapVisible, setMapVisible] = useState(true);

  useEffect(() => {
    // Animation sequence:
    // 1. Map visible initially (2 seconds)
    // 2. Map fades out (1.5 seconds)
    // 3. Tree appears after map fades out
    const sequence = async () => {
      // Wait 2 seconds with map visible
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fade out map
      setMapVisible(false);
      
      // Wait for fade out animation (1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show tree
      setShowTree(true);
    };

    sequence();
  }, []);

  const handleTreeComplete = () => {
    // Tree animation completed
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden check-page-container">
      {/* World Map - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <WorldMapBackground isVisible={mapVisible} />
      </div>

      {/* Layout: Desktop (side-by-side) | Mobile (stacked) */}
      <div className="relative z-10 flex flex-col md:flex-row h-screen">
        {/* Tree Area - Full width on mobile, 60% on desktop */}
        <div className="w-full md:w-[60%] bg-white relative overflow-hidden order-2 md:order-1">
          <AnimatePresence>
            {showTree && (
              <motion.div
                key="tree"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <CareerPathTree onAnimationComplete={handleTreeComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Login Modal - Full width on mobile, 40% on desktop */}
        <div className="w-full md:w-[40%] bg-white flex items-center justify-center p-4 md:p-8 order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <div className="bg-white border-[0.5px] border-black p-4 md:p-8 shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
                Career Counselling Assistant
              </h1>
              <p className="text-xs md:text-sm text-black mb-4 md:mb-6">
                Get personalized career guidance tailored to your education level, interests, and goals.
              </p>
              
              <div className="space-y-4">
                <AuthDialog>
                  <button
                    className="w-full px-4 md:px-6 py-2 md:py-3 bg-white border-[0.5px] border-black text-black font-semibold
                    text-sm md:text-base hover:bg-gray-50 transition-all duration-300
                    flex items-center justify-center"
                  >
                    <span>Get Started Free</span>
                  </button>
                </AuthDialog>
                <p className="text-xs text-black text-center">
                  No credit card required • Free forever • Start in seconds
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
