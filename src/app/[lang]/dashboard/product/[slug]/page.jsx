import React from 'react'
import dynamic from 'next/dynamic';
import Loader from "@/components/shared/Loader";
const ProductDetail = dynamic(() => import("@/components/dashboard/ProductDetails/index"));

async function page({params: {slug}}) {
  return (
    <div className="flex flex-row w-full">
      <ProductDetail product_id={slug} />
    </div>
  );
}

export default page