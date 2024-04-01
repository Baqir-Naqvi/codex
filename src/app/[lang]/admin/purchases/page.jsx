import React from "react";
import dynamic from "next/dynamic";
const AccountPurchases = dynamic(() => import("@/components/admin/purchases"), {
  ssr: false,
});

export default async function PurchasesPage() {
  return (
    <div className="w-full flex flex-col">
      <AccountPurchases />
    </div>
  );
}
