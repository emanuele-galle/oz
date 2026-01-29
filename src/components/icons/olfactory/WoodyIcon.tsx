import React from 'react';
import { Icon, IconProps } from '../Icon';

export function WoodyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v18M8 7h8M7 11h10M6 15h12M5 19h14" />
      <path d="M10 3h4v4h-4zM9 7h6v4H9zM8 11h8v4H8zM7 15h10v4H7z" />
    </Icon>
  );
}
