import React from "react";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import { getUserid } from "@/lib";
const EShopPurchases = dynamic(() =>
  import("@/components/dashboard/e-orders/index")
);

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const userId = await getUserid();

  return (
    <div className="w-full flex flex-col">
      <EShopPurchases t={dictionary} lang={lang} />
    </div>
  );
}

export default page;
