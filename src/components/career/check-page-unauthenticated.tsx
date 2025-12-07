'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { WorldMapBackground } from "./world-map-background";
import { CareerPathTree } from "./career-path-tree";

type AnimationState = 'map-visible' | 'map-fading-out' | 'tree-animating' | 'map-fading-in' | 'complete';

export function CheckPageUnauthenticated() {
  const [animationState, setAnimationState] = useState<AnimationState>('map-visible');
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
    // Animation sequence:
    // 1. Map visible (initial)
    // 2. Map fades out (1.5s)
    // 3. Tree starts animating (0.5s delay)
    // 4. Tree completes, map fades back in (1.5s)

    const sequence = async () => {
      // Wait 2 seconds, then fade out map
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnimationState('map-fading-out');

      // After map fades out, show tree
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnimationState('tree-animating');
      setShowTree(true);
    };

    sequence();
  }, []);

  const handleTreeComplete = () => {
    // After tree animation completes, fade map back in
    setTimeout(() => {
      setAnimationState('map-fading-in');
      setTimeout(() => {
        setAnimationState('complete');
        setShowTree(false);
      }, 1500);
    }, 500);
  };

  const isMapVisible = animationState === 'map-visible' || animationState === 'map-fading-in' || animationState === 'complete';

  return (
    <div className="min-h-screen bg-white relative overflow-hidden check-page-container">
      {/* World Map on Left Side */}
      <WorldMapBackground isVisible={isMapVisible} />

      {/* Split Layout: Left (Map) + Right (Login Modal) */}
      <div className="relative z-10 flex h-screen">
        {/* Left Side - World Map Area (50%) */}
        <div className="w-1/2 relative">
          {/* Map is handled by WorldMapBackground component */}
        </div>

        {/* Right Side - Login Modal (50%) */}
        <div className="w-1/2 bg-white flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Career Path Tree - Overlays center during animation */}
      <AnimatePresence>
        {showTree && animationState === 'tree-animating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 bg-white flex items-center justify-center"
          >
            <div className="w-full h-full max-w-6xl mx-auto">
              <CareerPathTree onAnimationComplete={handleTreeComplete} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
