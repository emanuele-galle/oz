import React from 'react';
import { Icon, IconProps } from '../Icon';

export function JasminIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 6v4M12 14v4M6 12h4M14 12h4" />
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
      <circle cx="12" cy="18" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
    </Icon>
  );
}
