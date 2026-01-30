'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          color: '#fff',
          backdropFilter: 'blur(12px)',
        },
        className: 'font-inter',
      }}
    />
  );
}
