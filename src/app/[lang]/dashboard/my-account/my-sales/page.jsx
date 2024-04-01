import React from "react";
import { getUserSales } from "@/lib/helpers";
import SalesHistory from "@/components/dashboard/my-sales";
import { getDictionary } from "@/lang/dictionaries";

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const { sales } = await getUserSales();

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold my-4">
        {dictionary.sidebar.sales}
      </h2>
      <div className="container mx-auto ">
        <SalesHistory
          orders={JSON.parse(JSON.stringify(sales))}
          t={dictionary}
        />
      </div>
    </div>
  );
}

export default page;
