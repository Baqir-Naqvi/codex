"use client"
import React from "react";
import { columns } from "@/components/dashboard/my-purchases/TableColumns";
import ProductsTable from "@/components/admin/UsersTable";
import Summary from "@/components/dashboard/my-purchases/Summary";


function PurhcaseHistory({ orders ,t}) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-semibold my-4">{t.mypurchase.mysummary}</h2>
      <Summary data={orders} t={t}/>
      <h2 className="text-2xl font-semibold my-4">{t.mypurchase.title}</h2>

      <ProductsTable
        data={orders}
        columns={columns}
        t={t}
      />
    </div>
  );
}

export default PurhcaseHistory;
