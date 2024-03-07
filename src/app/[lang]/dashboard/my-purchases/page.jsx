import React from "react";
import { getUserid } from "@/lib/index";
import { getUserHistory } from "@/lib/helpers";
import PurhcaseHistory from "@/components/dashboard/my-purchases";

async function page() {
  const userId = await getUserid();
  const { data } = await getUserHistory(userId);

  return (
    <div className="flex flex-col w-full">
      <div className="container mx-auto max-w-5xl">
        <PurhcaseHistory products={data} />
      </div>
    </div>
  );
}

export default page;
