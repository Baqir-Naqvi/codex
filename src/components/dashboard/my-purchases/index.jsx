import React from "react";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";
import { columns } from "@/components/dashboard/my-purchases/TableColumns";
const ProductsTable = dynamic(() => import("@/components/admin/UsersTable"), {
  ssr: false,
  loading: () => <Loader />,
});
const Summary = dynamic(() => import("@/components/dashboard/my-purchases/Summary"))

function PurhcaseHistory({ products }) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold my-4">Summary</h2>
      <Summary data={products} />
      <h2 className="text-2xl font-bold my-4">My Purchase History</h2>
      <ProductsTable columns={columns} data={products} />
    </div>
  );
}

export default PurhcaseHistory;
