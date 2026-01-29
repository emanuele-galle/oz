// Select Component with error states

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-2 text-sm font-medium text-white/80"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          className={cn(
            'flex w-full rounded-md border px-4 py-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-red-500 bg-black/50 text-white focus-visible:ring-red-500 focus-visible:border-red-500'
              : 'border-white/20 bg-black/50 text-white focus-visible:ring-gold focus-visible:border-gold',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-white/50">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
