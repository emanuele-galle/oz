import React from 'react';
import { Icon, IconProps } from '../Icon';

export function RoseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="10" r="2" />
      <path d="M12 8c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" />
      <path d="M10 6c-2-1.5-4-1-5 1M14 6c2-1.5 4-1 5 1M7 12c-2 0-3 1-3 3M17 12c2 0 3 1 3 3M10 15c-1 2-2 4 0 6M14 15c1 2 2 4 0 6" />
    </Icon>
  );
}
