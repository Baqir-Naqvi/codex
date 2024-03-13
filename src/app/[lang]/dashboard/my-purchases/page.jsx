import React from "react";
import { getUserHistory } from "@/lib/helpers";
import Loader from "@/components/shared/Loader";

import dynamic from "next/dynamic";
const PurhcaseHistory = dynamic(
  () => import("@/components/dashboard/my-purchases"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

async function page() {
  const { orders } = await getUserHistory();
  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto max-w-5xl">
        <PurhcaseHistory orders={orders} />
      </div>
    </div>
  );
}

export default page;
