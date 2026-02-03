'use client';

import dynamic from 'next/dynamic';

const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((mod) => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

export function ClientEffects() {
  return (
    <>
      <ScrollProgress />
    </>
  );
}
