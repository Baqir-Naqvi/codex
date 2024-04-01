import React from "react";
import { getUserPurchases } from "@/lib/helpers";
import Loader from "@/components/shared/TableSkeleton";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
const PurhcaseHistory = dynamic(
  () => import("@/components/dashboard/my-purchases"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

async function page({params: { lang } }) {
  //Since we are fetching the data from Server Side, we will use dynamic import to load the component along with Loader
  const { orders } = await getUserPurchases(false);
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto">
        <PurhcaseHistory orders={orders} t={dictionary} />
      </div>
    </div>
  );
}

export default page;
