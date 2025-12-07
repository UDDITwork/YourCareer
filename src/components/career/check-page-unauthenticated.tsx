'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { WorldMapBackground } from "./world-map-background";
import { CareerPathTree } from "./career-path-tree";

type ViewMode = 'login' | 'tree';

export function CheckPageUnauthenticated() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    // Show tree after 2 seconds
    const timer = setTimeout(() => {
      setViewMode('tree');
      setShowTree(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTreeComplete = () => {
    // Tree animation completed
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden check-page-container">
      {/* World Map on Left Side - Always visible */}
      <WorldMapBackground isVisible={true} />

      {/* Split Layout: Left (Map) + Right (Content) */}
      <div className="relative z-10 flex h-screen">
        {/* Left Side - World Map Area (40%) */}
        <div className="w-[40%] relative">
          {/* Map is handled by WorldMapBackground component */}
        </div>

        {/* Right Side - Content Area (60%) */}
        <div className="w-[60%] bg-white relative overflow-hidden">
          <AnimatePresence mode="wait">
            {viewMode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="w-full max-w-md">
                  <div className="bg-white border-[0.5px] border-black p-8 shadow-lg">
                    <h1 className="text-3xl font-bold mb-2 text-black">
                      Career Counselling Assistant
                    </h1>
                    <p className="text-sm text-black mb-6">
                      Get personalized career guidance tailored to your education level, interests, and goals.
                    </p>
                    
                    <div className="space-y-4">
                      <AuthDialog>
                        <button
                          className="w-full px-6 py-3 bg-white border-[0.5px] border-black text-black font-semibold
                          text-base hover:bg-gray-50 transition-all duration-300
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
                </div>
              </motion.div>
            )}

            {viewMode === 'tree' && showTree && (
              <motion.div
                key="tree"
                initial={{ opacity: 0, x: 20 }}
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
      </div>
    </div>
  );
}
