import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
const ProductsContainer = dynamic(() => import("@/components/shared/ProductsContainer"))


export default async function Home({ params : { lang } }) {

    
  const dictionary = await getDictionary(lang);
  return (
    <main className="w-full py-24 flex items-center">
      <ProductsContainer t={dictionary} />
    </main>
  );
}
