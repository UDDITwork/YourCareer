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
      className="absolute inset-0 left-0 w-1/2 h-full overflow-hidden bg-white"
    >
      {/* World map image with white overlay to create black outline effect */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          backgroundImage: 'url(https://t3.ftcdn.net/jpg/16/45/84/38/360_F_1645843834_4r5DRuI5C3LeQbuPKmHGQ8uKqvSnP4ej.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
          filter: 'grayscale(100%) contrast(200%) brightness(0.5)',
        }}
      />
      
      {/* White overlay to make background white */}
      <div className="absolute inset-0 bg-white opacity-70" />
      
      {/* Gradient fade to white on right edge - seamless blend, no visible boundary */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-white pointer-events-none" />
    </motion.div>
  );
}

