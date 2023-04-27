import useTranslation from 'next-translate/useTranslation';
import Layout from '@/components/Layout';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <>
      <Layout>
        <div className="h-full bg-slate-300 p-28">
          <div className="container px-4 mx-auto">
            <h1 className="text-2xl">{t('hello')}</h1>
            <p className="mt-4">{t('dummy-text')}</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
