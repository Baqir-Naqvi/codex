import Image from "next/image";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import { Suspense } from "react";
import Loader from "@/components/shared/Loader";
const ProductsContainer = dynamic(() => import("@/components/shared/ProductsContainer"), {
  loading: () => <Loader />,
  ssr: false,
})


export default async function Home({ params : { lang } }) {

    
  const dictionary = await getDictionary(lang);
  return (
    <main className="w-full py-24 flex items-center">
      <ProductsContainer t={dictionary} />
    </main>
  );
}
