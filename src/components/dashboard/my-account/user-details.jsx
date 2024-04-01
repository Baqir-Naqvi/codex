"use client";
import React from "react";
import { useUserStore } from "@/store/userStore";
import { useTradeStore } from "@/store/useTrade";
import { useConversionStore } from "@/store/conversionStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-4 mt-10">
      <Skeleton className="h-4 w-[250px] rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

function UserDetails({ t }) {
  const { user, authReady } = useUserStore();
  const { tradingProducts } = useTradeStore();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { currency, rate, weight, weightLabel } = useConversionStore();
  useEffect(() => {
    if (!authReady) return;
    if (tradingProducts) return setLoading(false);
    
  }, [authReady, tradingProducts]);
  const total_weight = tradingProducts.reduce((acc, product) => {
    return acc + product.purchasedWeight * product.purchasedQuantity;
  }, 0);
  const total_price = tradingProducts.reduce((acc, product) => {
    return acc + product.purchasedWeight * product.price * product.purchasedQuantity;
  }, 0);

  return (
    <div className="flex flex-col w-[90%] text-left items-left">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex flex-col w-full h-full gap-y-2">
          <h2 className="text-2xl font-bold my-4 border-b-[1px] border-black w-max">
            {user?.firstName} {user?.lastName}
          </h2>

          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-bold">
              {t.myaccount.accountNumber}: {user?.uniqueCode}
            </p>
            <p className="text-lg font-bold">
              {t.myaccount.currentbalance}: {(total_weight / weight).toFixed(2)}{" "}
              {weightLabel}
            </p>
            <p className="text-lg font-bold">
              In {t.myaccount.currencyTotal}: {(total_price / rate).toFixed(2)}{" "}
              {currency}
            </p>
            <Link href="/dashboard/my-account/my-purchases" className="w-max">
              <Button className="w-max">{t.sidebar.mypurchases}</Button>
            </Link>
            <Link href="/dashboard/my-account/my-marketplace" className="w-max">
              <Button className="w-max">{t.myaccount.mymarketplace.title}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
