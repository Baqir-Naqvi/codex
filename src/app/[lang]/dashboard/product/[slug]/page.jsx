import React from 'react'
import dynamic from 'next/dynamic';
import {getProductById} from '@/lib/helpers'
const ProductDetail = dynamic(() => import('@/components/dashboard/ProductDetails'), {
  ssr: false,
});

async function page({params: {slug}}) {
    const {data} = await getProductById(slug)
  return (
    <div className="flex flex-row w-full">
      <ProductDetail product={data} />
    </div>
  );
}

export default page