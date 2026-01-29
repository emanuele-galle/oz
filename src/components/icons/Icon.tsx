import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

/**
 * Base Icon wrapper component
 * Provides consistent sizing and color inheritance
 *
 * @param size - Icon size in pixels (default 24)
 * @param className - Tailwind classes for styling (color, etc.)
 */
export function Icon({
  size = 24,
  className = '',
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}
