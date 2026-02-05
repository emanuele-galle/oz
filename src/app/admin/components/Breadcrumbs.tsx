import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 mb-4 text-sm font-inter">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-stone-600">/</span>}
          {item.href ? (
            <Link href={item.href} className="text-stone-500 hover:text-gold-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
