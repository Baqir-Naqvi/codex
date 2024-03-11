"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import ProductsTable from "@/components/admin/UsersTable";
import { columns } from "@/components/dashboard/sell/TradeColumn";
import Loader from "@/components/shared/Loader";
import {useTradeStore} from "@/store/useTrade";
function TradeContainer({t, lang}) {
  const { user, authReady } = useUserStore();
  const {tradingProducts, setTradingProducts} = useTradeStore();
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authReady) return;
    fetch(`/api/user/trade?user_id=${user._id}`)
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
  }, [authReady]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-[90%] mx-auto">
          <h2 className="text-2xl font-bold my-4">{t.trade.myinventory}</h2>
          {tradingProducts?.map((order, index) => {
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
      )}
    </div>
  );
}

export default TradeContainer;
