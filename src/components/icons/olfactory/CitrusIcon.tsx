import React from 'react';
import { Icon, IconProps } from '../Icon';

export function CitrusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M21 12H3" />
      <path d="M16.5 7.5l-9 9M16.5 16.5l-9-9" />
    </Icon>
  );
}
