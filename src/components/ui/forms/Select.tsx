'use client';

// Enhanced Select Component with luxury styling

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  showSuccess?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, showSuccess, ...props }, ref) => {
    const [shouldShake, setShouldShake] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Shake animation on error change
    useEffect(() => {
      if (error && !shouldReduceMotion) {
        setShouldShake(true);
        const timer = setTimeout(() => setShouldShake(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error, shouldReduceMotion]);

    return (
      <motion.div
        className="w-full"
        animate={shouldShake && !shouldReduceMotion ? {
          x: [0, -10, 10, -10, 10, 0],
        } : undefined}
        transition={{ duration: 0.4 }}
      >
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-2 text-sm font-medium text-white/80 font-inter"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={cn(
            'flex w-full rounded-md border px-4 py-3 text-base transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-black/50 text-white',
            'bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'rgba(212,175,55,0.8)\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10',
            error
              ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              : showSuccess
              ? 'border-green-500 focus:border-green-500 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
              : 'border-white/20 focus:border-gold focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-midnight text-white">
              {option.label}
            </option>
          ))}
        </select>

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
Select.displayName = 'Select';

export { Select };
