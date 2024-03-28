import React from "react";
import { getUserSales } from "@/lib/helpers";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";
const SalesHistory = dynamic(
  () => import("@/components/dashboard/my-sales"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

async function page() {
  const {sales } = await getUserSales().catch((e) => {
    console.error(e);
    return { status: 400, sales: [] };
  });

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto max-w-6xl">
        <SalesHistory orders={JSON.parse(JSON.stringify(sales))} />
      </div>
    </div>
  );
}

export default page;
