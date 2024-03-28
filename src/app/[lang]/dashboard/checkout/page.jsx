import React from 'react'
import dynamic from 'next/dynamic'
import { getDictionary } from "@/lang/dictionaries";

const Checkout = dynamic(() => import('@/components/dashboard/checkout/index'), { ssr: false })

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return <div className='flex flex-col w-full h-full'>
    <Checkout t={dictionary} lang={lang} />
  </div>
}

export default page