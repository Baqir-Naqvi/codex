"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleDelete } from "@/components/admin/UsersTable/index";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useConversionStore } from "@/store/conversionStore";
import { useTradeStore } from "@/store/useTrade";

export const columns = [
  {
    accessorKey: "orderID",
    header: "Order ID",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <span>
          {account.sales_id} <br />
          {new Date(account.createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    header: "Name",
    cell: () => {
      const { user, authReady } = useUserStore();
      return <span>{authReady && user?.firstName + " " + user?.lastName}</span>;
    },
  },
  {
    header: "Account Number",
    cell: ({ row }) => {
      const { user, authReady } = useUserStore();
      return <span>{authReady && user?.accountNumber}</span>;
    },
  },
  {
    header: "Account Balance",
    cell: ({ row }) => {
      const { tradingProducts } = useTradeStore();
      const { authReady } = useUserStore();
      const { currency, rate, weight, weightLabel } = useConversionStore();
      const total_price = tradingProducts.reduce((acc, product) => {
        return acc + product.purchasedWeight * product.price;
      }, 0);
      const total_weight = tradingProducts.reduce((acc, product) => {
        return acc + product.purchasedWeight;
      }, 0);
      const accBalance = total_price / rate;
      if (!authReady) return null;
      return (
        <span>
          {accBalance.toFixed(2)} {currency} <br />
          <span className="text-green-500">
            {(total_weight / weight).toFixed(2)} {weightLabel}
          </span>
        </span>
      );
    },
  },
  {
    header: "New Account Balance",
    cell: ({ row }) => {
      const account = row.original;
      const { tradingProducts } = useTradeStore();
      const { authReady } = useUserStore();
      const { currency, rate, weight, weightLabel } = useConversionStore();
      const total_price = tradingProducts.reduce((acc, product) => {
        return acc + product.purchasedWeight * product.price;
      }, 0);
       const total_weight = tradingProducts.reduce((acc, product) => {
         return acc + product.purchasedWeight;
       }, 0);
      const accBalance = total_price / rate;
      const sellingPrice =
        (row.original.productPrice * row.original.weight_to_sell) / rate;
      if (!authReady) return null;
      return (
        <span>
          {row.original.payment_to_seller === "processed"
            ? accBalance.toFixed(2)
            : (accBalance + sellingPrice).toFixed(2)
            }
          {currency}
          <br />
          <span className="text-green-500">
            {
            row.original.payment_to_seller === "processed"? 
            ((total_weight) / weight).toFixed(2):
            ((total_weight - account.weight_to_sell) / weight).toFixed(2)}{" "}
            {weightLabel}
          </span>
        </span>
      );
    },
  },

  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },
  {
    accessorKey: "payment_to_seller",
    header: "Payment to Seller",
  },

  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      const account = row.original;
      const { currency, rate } = useConversionStore();
      return (
        <span>
          {currency}{" "}
          {((account.productPrice * account.weight_to_sell) / rate).toFixed(2)}
        </span>
      );
    },
  },
];
