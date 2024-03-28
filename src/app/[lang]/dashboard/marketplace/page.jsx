import React from 'react'
import {getMarketPlaceProducts} from '@/lib/helpers'
import MarketPlaceContainer from '@/components/dashboard/marketplace/container'
import { getDictionary } from '@/lang/dictionaries'

async function page({params: {lang} }) {
  const {data} = await getMarketPlaceProducts()
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col w-full h-full p-4">
      <h1 className="text-2xl font-semibold text-gray-700">Marketplace</h1>
      <MarketPlaceContainer products={JSON.parse(JSON.stringify(data))} t={dictionary}/>
    </div>
  );
}

export default page