"use client";
import React from "react";
import { columns } from "@/components/dashboard/my-sales/TableColumns";
import SalesTable from "@/components/admin/UsersTable";

function PurhcaseHistory({ orders }) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold my-4">My Sales</h2>

      <SalesTable data={orders} columns={columns} />
    </div>
  );
}

export default PurhcaseHistory;
