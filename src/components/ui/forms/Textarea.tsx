'use client';

// Enhanced Textarea Component with floating label and character count

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  showSuccess?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, showCharCount, showSuccess, value, maxLength, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [shouldShake, setShouldShake] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Track value state
    useEffect(() => {
      const currentValue = (value || props.defaultValue || '') as string;
      setHasValue(!!currentValue);
      setCharCount(currentValue.length);
    }, [value, props.defaultValue]);

    // Shake animation on error change
    useEffect(() => {
      if (error && !shouldReduceMotion) {
        setShouldShake(true);
        const timer = setTimeout(() => setShouldShake(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error, shouldReduceMotion]);

    const isNearLimit = maxLength && charCount >= maxLength * 0.9;

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
              className="absolute left-4 pointer-events-none font-inter origin-left z-10"
              animate={{
                top: isFocused || hasValue ? '0.5rem' : '1rem',
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

          {/* Textarea field */}
          <textarea
            className={cn(
              'flex min-h-[120px] w-full rounded-md border bg-black/50 text-white px-4 pt-8 pb-2 text-base transition-all placeholder:text-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y',
              error
                ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : showSuccess
                ? 'border-green-500 focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'border-white/20 focus:border-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]',
              className
            )}
            ref={ref}
            value={value}
            maxLength={maxLength}
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
              const newValue = e.target.value;
              setHasValue(!!newValue);
              setCharCount(newValue.length);
              props.onChange?.(e);
            }}
            {...props}
          />

          {/* Character count (bottom right) */}
          <AnimatePresence>
            {showCharCount && maxLength && (isFocused || hasValue) && (
              <motion.div
                className={cn(
                  'absolute right-3 bottom-3 text-xs font-inter',
                  isNearLimit ? 'text-red-400' : 'text-white/40'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {charCount}/{maxLength}
              </motion.div>
            )}
          </AnimatePresence>
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
Textarea.displayName = 'Textarea';

export { Textarea };
