'use client';

import { motion } from 'framer-motion';

interface WorldMapBackgroundProps {
  isVisible: boolean;
}

export function WorldMapBackground({ isVisible }: WorldMapBackgroundProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 left-0 w-[40%] h-full overflow-hidden bg-white"
    >
      {/* World map image with better visibility */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://t3.ftcdn.net/jpg/16/45/84/38/360_F_1645843834_4r5DRuI5C3LeQbuPKmHGQ8uKqvSnP4ej.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'grayscale(100%) contrast(150%) brightness(0.9)',
        }}
      />
      
      {/* Light overlay to maintain readability */}
      <div className="absolute inset-0 bg-white opacity-40" />
      
      {/* Gradient fade to white on right edge - seamless blend */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-white pointer-events-none" />
    </motion.div>
  );
}

