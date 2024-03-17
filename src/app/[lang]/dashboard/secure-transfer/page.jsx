import React from "react";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import {getUserid } from "@/lib";
const TradeContainer = dynamic(() =>
  import("@/components/dashboard/transfer/index.jsx")
);
const TransferRequests = dynamic(() =>
  import("@/components/dashboard/transfer/transfer-requests.jsx")
);

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const userId = await getUserid();
  

  return (
    <div className="w-full flex flex-col">
      <TradeContainer t={dictionary} lang={lang} />
      <TransferRequests t={dictionary} lang={lang} userId={userId} />
    </div>
  );
}

export default page;
