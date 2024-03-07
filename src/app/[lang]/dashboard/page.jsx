import Image from "next/image";
import ProductsContainer from "@/components/shared/ProductsContainer";
import { getDictionary } from "@/lang/dictionaries";


export default async function Home({ params : { lang } }) {

    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/products`,
      { cache: "no-store" },
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

  const dictionary = await getDictionary(lang);
  return (
    <main className="w-full py-24 bg-gradient-to-r from-blue-200 to-violet-100">
      <ProductsContainer products={data} t={dictionary} />
    </main>
  );
}
