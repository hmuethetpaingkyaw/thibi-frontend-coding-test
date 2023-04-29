import useGlossary from '@/hooks/useGlossary';
import { useEffect } from 'react';
import { GlossaryCard } from '@/components/Glossary/GlossaryCard';
import { GlossaryPageLayout } from '@/components/Glossary/GlossaryPageLayout';
import Loading from '@/components/Loading';
import { useGlossaryType } from '@/types/Glossary';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { state, fetchGlossaries } : useGlossaryType = useGlossary();
  
  useEffect(() => {
    fetchGlossaries(router.query.filter as string);
  }, [router.query.filter]);

  return (
    <GlossaryPageLayout>
      {state.loading ? <Loading /> : <GlossaryCard data={state.glossaries} />}
    </GlossaryPageLayout>
  );
}
