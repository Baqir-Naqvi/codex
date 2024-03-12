import React from "react";
import { columns } from "@/components/dashboard/my-purchases/TableColumns";
import ProductsTable from "@/components/admin/UsersTable";
import Summary from "@/components/dashboard/my-purchases/Summary";

function PurhcaseHistory({ orders }) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold my-4">Summary</h2>
      <Summary data={orders} />
      <h2 className="text-2xl font-bold my-4">My Purchase History</h2>
      {orders?.map((order, index) => {
        return (
          <div key={index}>
            <ProductsTable
              data={order}
              columns={columns}
              title={`Order ${index + 1}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PurhcaseHistory;
