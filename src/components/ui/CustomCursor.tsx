'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor
      ) {
        setIsHovering(true);
        setCursorText(target.dataset.cursorText || '');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor], input, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as any);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as any);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Outer ring */}
          <motion.div
            className="w-10 h-10 rounded-full border-2 border-gold"
            animate={{
              scale: isHovering ? 1.5 : 1,
            }}
          />

          {/* Inner dot */}
          <motion.div
            ref={cursorDotRef}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold rounded-full"
            style={{ translateX: '-50%', translateY: '-50%' }}
            animate={{
              scale: isHovering ? 0 : 1,
            }}
          />

          {/* Cursor text */}
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gold text-black text-xs font-inter font-medium rounded-full whitespace-nowrap"
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
