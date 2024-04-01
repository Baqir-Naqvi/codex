import React from "react";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
const AdminAccountSales = dynamic(() => import("@/components/admin/sales"), {
  ssr: false,
});

export default async function SalesPage({ params }) {
  const { lang } = params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="w-full flex flex-col">
      <AdminAccountSales t={dictionary} />
    </div>
  );
}
