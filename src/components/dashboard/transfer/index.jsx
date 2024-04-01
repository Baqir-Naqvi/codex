"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import ProductsTable from "@/components/admin/UsersTable";
import { columns } from "@/components/dashboard/transfer/transfer-column";
import Loader from "@/components/shared/Loader";
import { useTradeStore } from "@/store/useTrade";
function TradeContainer({ t, lang, userId }) {
  const { tradingProducts, setTradingProducts } = useTradeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/user/inventory?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // setOrders(data.orders);
          setTradingProducts(data.orders);
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
  }, []);
  return (
    <div>
      {/* we will use skeletal loader here  */}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-[90%] mx-auto">
          <h2 className="text-xl font-bold my-4">{t.securetransfer.title}</h2>

          <ProductsTable data={tradingProducts} columns={columns} />
        </div>
      )}
    </div>
  );
}

export default TradeContainer;
