"use client";
import React from "react";
import { useState, useEffect } from "react";
import ProductsTable from "@/components/admin/UsersTable";
import { columns } from "@/components/dashboard/sell/sell-column";
import Loader from "@/components/shared/Loader";
import { useTradeStore } from "@/store/useTrade";
function TradeContainer({ t, lang, userId }) {
  const { tradingProducts, setTradingProducts } = useTradeStore();
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tradingProducts.length > 0) return setLoading(false);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-[90%] mx-auto">
          <h2 className="text-2xl font-bold my-4">{t.trade.myinventory}</h2>

          <ProductsTable
            data={tradingProducts}
            columns={columns}
            title="My Inventory"
          />
        </div>
      )}
    </div>
  );
}

export default TradeContainer;
