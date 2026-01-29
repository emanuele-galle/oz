import React from 'react';
import { Icon, IconProps } from '../Icon';

export function BergamotIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c-4 0-7 3-7 7 0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" />
      <circle cx="12" cy="10" r="3" />
      <path d="M12 3v4M9 7l3-4 3 4" />
    </Icon>
  );
}
