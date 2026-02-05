import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/account/'],
      },
    ],
    sitemap: 'https://oz.fodivps2.cloud/sitemap.xml',
  };
}
