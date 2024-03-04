import React from "react";
// import ProductForm from "@/components/admin/ProductForm";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";
import { getDictionary } from "@/lang/dictionaries";

const EditProductForm = dynamic(
  () => import("@/components/admin/ProductForm/edit-form"),
  {
    ssr: false,
    loading: () => <Loader message="Loading Product" />,
  }
);
const ProductForm = dynamic(() => import("@/components/admin/ProductForm"), {
  ssr: false,
  loading: () => <Loader message="Loading Product" />,
});

async function page({ params, searchParams }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);
  const { id } = searchParams;
  if(!id) return (
    <div className="flex flex-col items-center items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-4xl w-full">
         <ProductForm t={dictionary} />
      </div>
    </div>
  );
  let { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product?id=${id}`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col items-center items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-4xl w-full">
       <EditProductForm product={data} t={dictionary} />
      </div>
    </div>
  );
}

export default page;
