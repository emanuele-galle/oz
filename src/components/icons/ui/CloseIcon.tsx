import React from 'react';
import { Icon, IconProps } from '../Icon';

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 18L18 6M6 6l12 12" />
    </Icon>
  );
}
