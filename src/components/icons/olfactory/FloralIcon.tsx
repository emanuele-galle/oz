import React from 'react';
import { Icon, IconProps } from '../Icon';

export function FloralIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="17" cy="7" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="7" cy="7" r="1.5" />
    </Icon>
  );
}
