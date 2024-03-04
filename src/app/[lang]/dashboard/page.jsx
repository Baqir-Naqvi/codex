import Image from "next/image";
import ProductsContainer from "@/components/shared/ProductsContainer";

export default async function Home() {

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-blue-200 to-green-100">
      <ProductsContainer products={data} />
    </main>
  );
}
