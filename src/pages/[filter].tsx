import { GlossaryCard } from '@/components/Glossary/GlossaryCard';
import { GlossaryPageLayout } from '@/components/Glossary/GlossaryPageLayout';
import Loading from '@/components/Loading';
import useGlossary from '@/hooks/useGlossary';
import { useGlossaryType } from '@/types/Glossary';
import useTranslation from 'next-translate/useTranslation';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

export default function FilteredGlossaryPage() {
  const { t } = useTranslation('common');
  const router: NextRouter = useRouter();
  const { state, filteredGlossaries }: useGlossaryType = useGlossary();

  useEffect(() => {
    if (router.isReady) {
      filteredGlossaries(router.query.filter as string);
    }
  }, [router.query.filter, router.isReady]);

  return (
    <GlossaryPageLayout>
      {state.loading ? <Loading /> : <GlossaryCard data={state.glossaries} />}
    </GlossaryPageLayout>
  );
}
