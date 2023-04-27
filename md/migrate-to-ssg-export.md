# Migrate to SSG for static export

## When to use

Consider using [this template](https://gitlab.com/thibi/nextjs-starter) **only** if your primary use case is generating static pages and depoy them to GitHub/GitLab Pages.

<br />

## Migrate to next-i18next

Install required dependencies such as `next-i18next` and `i18next-browser-languagedetector`:

```sh
>> yarn add next-i18next i18next-browser-languagedetector
```

create `next-i18next.config.js` at the root directory:

```js:next-i18next.config.js
module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'mm']
    },
}
```

Move your `locales` folder `/public/locales` and use `appWithTranslation` HOC to wrap your `_app.tsx`:

```tsx:_app.tsx
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { appWithTranslation } from "next-i18next";
import * as ga from '@/lib/gtag';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { events } = router;

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      ga.pageview(url);
    };
    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
```

Create a languagedetector that will force the default/empty route to `defaultLocale` in `/pages/index.tsx`:

```js:index.tsx
import i18nextConfig from '../../next-i18next.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const getStaticProps = () => {
  const { locales } = i18nextConfig.i18n;
  return {
    props: {
      locales,
    },
  };
};

const Index = ({ locales }: any) => {
  const router = useRouter();
  useEffect(() => {
    for (const locale of locales) {
      for (const lang of navigator.languages) {
        if (lang.startsWith(locale)) {
          router.replace('/' + locale);
          return;
        }
      }
    }
  }, []);

  return <></>;
};

export default Index;
```

Create `[locale]` folder for dynamic paths under `/pages/` and create an `/pages/[locale]/index.tsx` that will act as root path for handling dynamic root routes (i.e. `/mm` or `/en`).

And in `getStaticPaths()` we will need to assign the dynamic paths with proper params so that we will be able to generate html files for them.

For example, we are using `[locale]` as dynamic path, so we need to provide locale param for both languages.

Hardcoded example of paths format:

```js
export const getStaticPaths = () => ({
  fallback: false,
  paths: [{ params: { locale: 'en' } }, { params: { locale: 'mm' } }],
});
```

Example of how to change language for **next-i18next** and assign paths dynamically in `getStaticPaths()`:

```tsx:pages/[locale]/index.tsx
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Meta from '@/components/meta';
import LanguageToggle from '@/components/LanguageToggle';

import i18nextConfig from '../../../next-i18next.config';
import { getI18nPaths } from '../../../getI18nPaths';

export default function Home() {
  const router = useRouter();
  const locale = typeof router.locale === 'string' ? router.locale : '';
  const { t, i18n } = useTranslation('common');

  const setLanguage = (currentLocale: string) => {
    let orgPath = router.asPath;
    let currentPath = orgPath.replace(`/${router.query.locale}`, `/${currentLocale}`);
    router.push(currentPath);
  };
  return (
    <>
      <Meta />
      <div className="mx-auto my-20 bg-gray-400 max-w-7xl h-96 p-28">
        <h1 className="text-2xl">{t('hello')}</h1>
        <div className="px-3 py-2">
          <LanguageToggle
            value={t('en')}
            isActive={locale === 'en'}
            onClick={() => setLanguage('en')}
          />
          /
          <LanguageToggle
            value={t('mm')}
            isActive={locale === 'mm'}
            onClick={() => setLanguage('mm')}
          />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { locales } = i18nextConfig.i18n;

  const paths = locales
    .map((lng) => ({
      params: {
        locale: lng,
      },
    }))
    .flat();
  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps = async (ctx: any) => ({
  props: {
    ...(await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig)),
  },
});
```

Use these repos as reference for more nested/complex paths:

1. [giscurriculum](https://github.com/Thibico/giscurriculum)
2. [yangonstories](https://gitlab.com/thibi/yangonstories/-/tree/feat/2022-09-06/localization)

By now, localizations should be working fine with static export.

<br />

## Exporting static files

Since static export should be ok by now, we need to add `export` to our build scripts:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "build:out": "yarn build:prod && yarn export",
  },
```

When deploying to GitHub/GitLab Pages, we might come across a sub directory path issues (basePath, assetPrefix,...) where your static assets (js/css/..) are being fetched from the root path instead of sub directory path, you can provide a conditional path in your `next.config.js`:

```js:next.config.js
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  basePath: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '/giscurriculum' : '',
  assetPrefix: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? '/giscurriculum/' : '',
}
```

You might also need to provide conditional path for your images and navs, and to fix that you can use a helper function like [`withBasePath()`](https://github.com/Thibico/giscurriculum/blob/main/src/lib/utils.js).

### Clean up dependencies

Since we are using `next-i18next` for localization, we can now remove dependencies related to `next-translate` and its configuration:

1. remove `next-translate` from dependencies in your `package.json`
2. remove i18n.json

<br />

Use these as references

1. [next-i18next](https://github.com/i18next/next-i18next)
2. [next-starter-ssg](https://gitlab.com/thibi/nextjs-starter-ssg)
3. [giscurriculum](https://github.com/Thibico/giscurriculum)
4. [yangonstories](https://gitlab.com/thibi/yangonstories/-/tree/feat/2022-09-06/localization)
