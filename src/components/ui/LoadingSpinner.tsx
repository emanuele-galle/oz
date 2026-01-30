'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gold/20" />

        {/* Spinning segment */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold" />

        {/* Inner glow */}
        <motion.div
          className="absolute inset-2 rounded-full bg-gold/10"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  );
}

export function LoadingScreen({ message = 'Caricamento...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <LoadingSpinner size="lg" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-playfair text-xl text-gold"
      >
        {message}
      </motion.p>
    </div>
  );
}
