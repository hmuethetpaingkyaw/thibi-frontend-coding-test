import type { FC, ReactNode } from 'react';
import Layout from '../Layout';
import { Alphabets } from './Alphabets';

interface Props {
  children: ReactNode;
}
export const GlossaryPageLayout: FC<Props> = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Layout>
        <div className="h-100 px-10 py-20 lg:px-28 flex flex-col content-between  space-y-10">
          <p className="mt-4 text-center font-semibold text-xl">ဝေါဟာရ</p>
          <p className="text-center text-sm text-gray-500">
            သတင်းအချက်အလက်တွေကို နည်းပညာအသုံးပြုပြီး သိမ်းဆည်းခြင်း၊ ရယူခြင်း၊ အသုံးချခြင်းလို့
            အဓိပ္ပာယ် ဖွင့်ဆိုနိုင်ပါတယ်။
          </p>

          <Alphabets />
          {children}
        </div>
        <div className="flex justify-center">
          <span className="text-gray-500 underline underline-offset-3 text-xs cursor-pointer mb-3" onClick={scrollToTop}>
            စာမျက်နှာအပေါ်သို့
          </span>
        </div>
      </Layout>
    </>
  );
};
