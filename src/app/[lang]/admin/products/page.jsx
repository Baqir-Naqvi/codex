import dynamic from "next/dynamic";
import { columns } from "@/components/admin/ProductsTable/columns";
import Link from "next/link";
import axios from "axios";
import Loader from "@/components/shared/Loader";
const ProductsTable = dynamic(() => import("@/components/admin/UsersTable"), {
  ssr: false,
  loading: () => <Loader />,
});

export default async function Products() {

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
    <div className="flex flex-col items-center items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-4xl w-full">
        <ProductsTable columns={columns} data={data} />
        <div className="flex flex-row justify-end w-full mt-10">
          <Link href="/admin/products/add">
            <p className="text-white bg-black p-2 rounded-md">Add Product</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
