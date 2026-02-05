import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OZ Extrait',
    url: 'https://oz.fodivps2.cloud',
    logo: 'https://oz.fodivps2.cloud/uploads/images/og-cover.jpg',
    description: 'Profumi di lusso Extrait de Parfum artigianali italiani by Zoe Cristofoli',
    founder: {
      '@type': 'Person',
      name: 'Zoe Cristofoli',
      sameAs: [
        'https://www.instagram.com/zoe_cristofoli',
      ],
    },
    sameAs: [
      'https://www.instagram.com/zoe_cristofoli',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'Italian',
    },
  };

  return <JsonLd data={schema} />;
}

// Product Schema
export function ProductSchema({
  name,
  description,
  image,
  price,
  sku,
  brand = 'OZ Extrait',
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  sku: string;
  brand?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://oz.fodivps2.cloud${image}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    sku,
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'OZ Extrait',
      },
    },
    // aggregateRating pulled from real reviews when available
  };

  return <JsonLd data={schema} />;
}

// BreadcrumbList Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://oz.fodivps2.cloud${item.url}`,
    })),
  };

  return <JsonLd data={schema} />;
}
