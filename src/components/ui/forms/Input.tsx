'use client';

// Enhanced Input Component with floating label and luxury animations

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/components/icons';
import { useReducedMotion } from '@/hooks';

const inputVariants = cva(
  'flex w-full rounded-md border bg-black/50 text-white px-4 pt-6 pb-2 text-base transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-white/20 focus:border-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]',
        error:
          'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
        success:
          'border-green-500 focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  showSuccess?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, label, error, helperText, showSuccess, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [shouldShake, setShouldShake] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Track value state
    useEffect(() => {
      setHasValue(!!value || !!props.defaultValue);
    }, [value, props.defaultValue]);

    // Shake animation on error change
    useEffect(() => {
      if (error && !shouldReduceMotion) {
        setShouldShake(true);
        const timer = setTimeout(() => setShouldShake(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error, shouldReduceMotion]);

    // Determine variant
    const currentVariant = error ? 'error' : showSuccess ? 'success' : variant;

    return (
      <motion.div
        className="w-full relative"
        animate={shouldShake && !shouldReduceMotion ? {
          x: [0, -10, 10, -10, 10, 0],
        } : undefined}
        transition={{ duration: 0.4 }}
      >
        <div className="relative">
          {/* Floating label */}
          {label && (
            <motion.label
              htmlFor={props.id}
              className="absolute left-4 pointer-events-none font-inter origin-left"
              animate={{
                top: isFocused || hasValue ? '0.5rem' : '1.125rem',
                fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
                color: isFocused
                  ? error
                    ? 'rgb(239, 68, 68)'
                    : showSuccess
                    ? 'rgb(34, 197, 94)'
                    : 'rgb(212, 175, 55)'
                  : 'rgba(255, 255, 255, 0.6)',
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.2,
                ease: 'easeOut',
              }}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </motion.label>
          )}

          {/* Input field */}
          <input
            type={type}
            className={cn(inputVariants({ variant: currentVariant }), className)}
            ref={ref}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />

          {/* Success icon */}
          {showSuccess && !error && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
            >
              <CheckIcon size={20} className="text-green-500" />
            </motion.div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            className="mt-1.5 text-sm text-red-500 font-inter"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-white/50 font-inter">{helperText}</p>
        )}
      </motion.div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
