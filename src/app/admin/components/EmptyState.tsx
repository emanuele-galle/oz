import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Icon className="w-12 h-12 text-stone-700 mb-4" />
      <h3 className="text-stone-300 font-inter text-base font-medium mb-1">{title}</h3>
      <p className="text-stone-500 text-sm font-inter mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-4 py-2 bg-gold-500 text-stone-950 text-sm font-inter font-semibold rounded hover:bg-gold-400 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
