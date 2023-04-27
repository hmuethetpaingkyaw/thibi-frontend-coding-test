import useTranslation from 'next-translate/useTranslation';
import Layout from '@/components/Layout';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <>
      <Layout>
        <div className="h-full bg-slate-300 p-28">
          <div className="container px-4 mx-auto">
            <p className="mt-4">Implement Glossary data Here</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
