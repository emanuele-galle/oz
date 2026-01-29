import React from 'react';
import { Icon, IconProps } from '../Icon';

export function GiftBoxIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875v16.125M6.75 7.5c0-.621.504-1.125 1.125-1.125h8.25c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-8.25A1.125 1.125 0 016.75 11.25v-3.75z" />
      <path d="M9 7.5V4.875C9 3.839 9.84 3 10.875 3h2.25C14.16 3 15 3.84 15 4.875V7.5" />
      <path d="M3 11.25h18" />
    </Icon>
  );
}
