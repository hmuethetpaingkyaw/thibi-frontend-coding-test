import type { Glossary } from '@/types/Glossary';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import type { FC } from 'react';

type Props = {
  data: Glossary[];
};
export const GlossaryCard: FC<Props> = ({ data }) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();

  return (
    <div className="min-w-full mx-auto">
      <div className="bg-white shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4 px-8 text-white font-bold">
          {router.query.filter ? router.query.filter : '#'}
        </div>
        <div className="p-4 md:p-8">
          {data.length > 0 ? (
            <ul className="space-y-4 md:space-y-8">
              {data?.map((glossary: Glossary, index: number) => (
                <li key={`${glossary}${index}`}>
                  <div className="px-4 md:px-8 space-y-4">
                    <span className="font-semibold underline decoration-gray-400 ">
                      {glossary.attributes?.en_term}
                    </span>
                    <p className="text-gray-500">
                      {lang === 'mm'
                        ? glossary.attributes?.mm_term
                        : glossary.attributes?.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-center'>{t('no-data')}</div>
          )}
        </div>
      </div>
    </div>
  );
};
