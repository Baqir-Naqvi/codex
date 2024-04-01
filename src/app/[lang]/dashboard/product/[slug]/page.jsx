import React from 'react'
import dynamic from 'next/dynamic';
import { getDictionary } from '@/lang/dictionaries';
import { getUserid } from '@/lib';
const ProductDetail = dynamic(() => import("@/components/dashboard/ProductDetails/index"));

async function page({params: {slug , lang }}) {
  const dictionary = await getDictionary(lang);
  const userID = await getUserid();
  return (
    <div className="flex flex-row w-full">
      <ProductDetail product_id={slug} t={dictionary} userID={userID} />
    </div>
  );
}

export default page