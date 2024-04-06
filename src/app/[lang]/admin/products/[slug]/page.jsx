import React from "react";
// import ProductForm from "@/components/admin/ProductForm";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/TableSkeleton";
import { getDictionary } from "@/lang/dictionaries";
import { getProduct } from "@/lib/admin";
import ProductForm from "@/components/admin/ProductForm";

const EditProductForm = dynamic(() => import("@/components/admin/ProductForm/edit-form"),{
  ssr: false,
  loading: () => <Loader />,
});

async function page({ params:{lang}, searchParams }) {
  const dictionary = await getDictionary(lang);
  const { id } = searchParams;
  if(!id) return (
    <div className="flex flex-col items-center w-full h-full justify-center py-10">
      <h2 className="text-2xl font-semibold my-5">{dictionary.admin.product.add}</h2>
      <div className="flex justify-center flex-col max-w-4xl w-full">
         <ProductForm t={dictionary} />
      </div>
    </div>
  );
  const { data } = await getProduct(id);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-4xl w-full">
       <EditProductForm product={data} t={dictionary} />
      </div>
    </div>
  );
}

export default page;
