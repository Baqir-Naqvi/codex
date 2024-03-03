import React from "react";
import ProductForm from "@/components/admin/ProductForm";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";
const EditProductForm = dynamic(
  () => import("@/components/admin/ProductForm/edit-form"),
  {
    ssr: false,
    loading: () => <Loader message="Loading Product" />,
  }
);

async function page({ params, searchParams }) {
  const { slug } = params;
  const { id } = searchParams;

  let { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/product?id=${id}`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col items-center items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-4xl w-full">
        {id ? <EditProductForm product={data} /> : <ProductForm />}
      </div>
    </div>
  );
}

export default page;
