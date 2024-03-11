import React from 'react'
import dynamic from 'next/dynamic'
import { getDictionary } from '@/lang/dictionaries'
const TradeContainer = dynamic(() => import('@/components/dashboard/sell/index.jsx'));

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="w-full flex flex-col">
      <TradeContainer t={dictionary} lang={lang} />
    </div>
  );
}

export default page