'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function CustomerSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`/admin/customers?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Cerca nome o email..."
      className="px-4 py-2 bg-stone-800 border border-stone-700 rounded text-white text-sm font-inter focus:outline-none focus:border-gold-500 w-64"
    />
  );
}
