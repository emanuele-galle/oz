'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HoverCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function HoverCard3D({ children, className = '', intensity = 15 }: HoverCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}
