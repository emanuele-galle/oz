'use client';

import { motion } from 'framer-motion';

interface AuraEffectProps {
  color?: string;
  className?: string;
}

export function AuraEffect({ color = 'rgba(212, 175, 55, 0.15)', className = '' }: AuraEffectProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />
    </motion.div>
  );
}
