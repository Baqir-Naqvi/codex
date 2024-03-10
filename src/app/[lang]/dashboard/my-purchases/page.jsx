import React from "react";
import { getUserid } from "@/lib/index";
import { getUserOrderHistory } from "@/lib/helpers";
import PurhcaseHistory from "@/components/dashboard/my-purchases";

async function page() {
  const { orders } = await getUserOrderHistory()
  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto max-w-5xl">
        <PurhcaseHistory orders={orders} />
      </div>
    </div>
  );
}

export default page;
