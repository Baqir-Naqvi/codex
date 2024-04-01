import React from "react";
import { getDictionary } from "@/lang/dictionaries";
import EShopPurchases from "@/components/dashboard/e-orders/index";


async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="w-full flex flex-col">
      <EShopPurchases t={dictionary} lang={lang} />
    </div>
  );
}

export default page;
