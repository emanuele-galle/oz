import React from 'react';
import { Icon, IconProps } from '../Icon';

export function FruityIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c-.765 0-1.516.063-2.25.184M15.75 3c.765 0 1.516.063 2.25.184m-6 0a6 6 0 00-4.5 9.066M15.75 3a6 6 0 014.5 9.066M3.75 12.25a8.25 8.25 0 0016.5 0" />
      <circle cx="12" cy="16" r="4.5" />
      <path d="M12 2v3" />
    </Icon>
  );
}
