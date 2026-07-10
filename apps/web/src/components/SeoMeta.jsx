import React from 'react';
import { Helmet } from 'react-helmet';

const SITE_URL = 'https://smzentrix.info';
const DEFAULT_IMAGE_PATH = '/dashboard_hero_mockup.png';

function toCanonicalUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

function SeoMeta({
  title,
  description,
  path = '/',
  imagePath = DEFAULT_IMAGE_PATH,
  type = 'website',
  schemaData
}) {
  const canonicalUrl = toCanonicalUrl(path);
  const imageUrl = `${SITE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SM Zentrix',
    url: SITE_URL,
    logo: imageUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9011589198',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Marathi', 'Hindi']
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="SM Zentrix" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(schemaData || defaultSchema)}</script>
    </Helmet>
  );
}

export default SeoMeta;