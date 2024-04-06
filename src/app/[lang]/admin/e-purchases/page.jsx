import React from "react";
import dynamic from "next/dynamic";
const EPurchases = dynamic(() => import("@/components/admin/e-purchases"), {
  ssr: false,
});

export default async function EShopStats() {
  return (
    <div className="w-full flex flex-col">
      <EPurchases />
    </div>
  );
}
