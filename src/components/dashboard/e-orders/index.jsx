"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import ProductsTable from "@/components/admin/UsersTable";
import { columns } from "@/components/dashboard/e-orders/eshop-column";
import Loader from "@/components/shared/TableSkeleton";
import { useTradeStore } from "@/store/useTrade";
function EShopPurchases({ t, lang }) {
  const { user, authReady } = useUserStore();
  const { eshopProducts, setEshopProducts } = useTradeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authReady) return;
    fetch(`/api/user/inventory?user_id=${user._id}&eshop=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setEshopProducts(data.orders);
          setLoading(false);
        } else {
          console.log(data.message);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [authReady]);
  return (
    <div className="flex flex-col w-[90%] mx-auto">
      <h2 className="text-2xl font-semibold my-4">{t.eshop.title}</h2>

      {loading ? (
        <Loader />
      ) : (
          <ProductsTable data={eshopProducts} columns={columns} />
      )}
    </div>
  );
}

export default EShopPurchases;
