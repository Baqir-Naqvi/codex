import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
const ProductsContainer = dynamic(() => import("@/components/shared/ProductsContainer"))


export default async function Home({ params : { lang } }) {

    
  const dictionary = await getDictionary(lang);
  return (
    <main className="w-full pb-24 pt-10 flex items-center">
      <ProductsContainer t={dictionary} />
    </main>
  );
}
