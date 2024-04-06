import dynamic from "next/dynamic";
import { columns } from "@/components/admin/ProductsTable/columns";
import { getDictionary } from "@/lang/dictionaries";
import Loader from "@/components/shared/TableSkeleton";
import Link from "next/link";
import { getProducts } from "@/lib/admin";
const ProductsTable = dynamic(() => import("@/components/admin/UsersTable"), {
  ssr: false,
  loading: () => <Loader />,
});

export default async function Products({ params:{lang} }) {
  const t = await getDictionary(lang);
  const { data } = await getProducts();
  return (
    <div className="flex flex-col items-center w-full h-full justify-center py-10">
      <div className="flex justify-center flex-col max-w-7xl w-full">
        <ProductsTable columns={columns} data={data} />
        <div className="flex flex-row justify-end w-full mt-10">
          <Link href={`/${lang}/admin/products/add `}>
            <p className="text-white bg-black p-2 rounded-md">
              {t.admin.product.add}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
