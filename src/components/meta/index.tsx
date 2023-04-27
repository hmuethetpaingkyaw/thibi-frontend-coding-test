import Head from 'next/head';
import siteMeta from '../../config/metaConfig';

export type MetaInfoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  sitetype?: string;
};

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/icons/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/icons/android-chrome-512x512.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/icons/android-chrome-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/icons/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/icons/favicon-16x16.png',
  },
];

const MetaInfo = ({ title, description, image, url, sitetype }: MetaInfoProps) => {
  const pageTitle = title ? `${title} | ${siteMeta.siteName}` : siteMeta.siteName;
  const pageDescription = description ? description : siteMeta.description;
  const pageImage = image ?? `${siteMeta.siteImage}`;
  const pageUrl = url ? url : siteMeta.siteUrl;
  const pageType = sitetype ? sitetype : siteMeta.siteContentType;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="keywords" content={siteMeta.siteContent} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="description" content={pageDescription} />

      {/* OpenGraph | Facebook */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content="en_IE" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={pageImage} />
      <meta property="twitter:image:alt" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={pageImage} />

      {/* Root */}
      <link rel="canonical" href={pageUrl} />

      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="android-chrome-192x192.png" />
      <meta name="theme-color" content="#000000" />
    </Head>
  );
};

export default MetaInfo;
