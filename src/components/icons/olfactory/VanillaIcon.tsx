import React from 'react';
import { Icon, IconProps } from '../Icon';

export function VanillaIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3v18M6 3c2 0 4 2 4 4v10c0 2-2 4-4 4M6 3c-2 0-4 2-4 4v10c0 2 2 4 4 4" />
      <path d="M10 7h3c3 0 5 2 5 5s-2 5-5 5h-3" />
      <circle cx="13" cy="12" r="1" />
    </Icon>
  );
}
