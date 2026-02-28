'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { useMagneticEffect, useReducedMotion } from '@/hooks';
import { buttonVariants as motionButtonVariants, rippleVariants } from '@/lib/animations/microInteractions';

const buttonVariants = cva(
  // Base styles
  "relative inline-flex items-center justify-center font-inter font-medium tracking-wide uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-gold text-black hover:bg-gold-light",
        secondary: "bg-white text-black hover:bg-white/90",
        outline: "border-2 border-gold text-gold hover:bg-gold hover:text-black",
        ghost: "text-gold hover:bg-gold/10",
      },
      size: {
        sm: "px-6 py-2 text-xs",
        md: "px-8 py-3 text-sm",
        lg: "px-10 py-4 text-base",
        xl: "px-12 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  disableMagnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disableMagnetic, onClick, disabled, children, ...restProps }, forwardedRef) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Magnetic effect (solo se non disabled e non in reduced motion)
    const { x, y } = useMagneticEffect(buttonRef, {
      strength: disableMagnetic || disabled || shouldReduceMotion ? 0 : 0.3,
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Ripple effect
      if (!shouldReduceMotion) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple: Ripple = {
          id: Date.now(),
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        setRipples((prev) => [...prev, ripple]);

        // Cleanup ripple dopo animazione
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 600);
      }

      // Trigger original onClick
      onClick?.(e);
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={buttonVariants({ variant, size, className })}
        onClick={handleClick}
        disabled={disabled || loading}
        variants={shouldReduceMotion ? undefined : motionButtonVariants}
        initial="rest"
        whileHover={disabled || loading ? undefined : "hover"}
        whileTap={disabled || loading ? undefined : "tap"}
        style={shouldReduceMotion || disableMagnetic ? undefined : { x, y }}
        {...(restProps as Record<string, unknown>)}
      >
        {/* Ripple effect overlay */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Loading spinner */}
        {loading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center bg-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.span>
        )}

        {/* Button content */}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {children as React.ReactNode}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
