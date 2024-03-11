"use client";
import TradeModal from "./trade-modal";
import { useUserStore } from "@/store/userStore";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "purchasedWeight",
    header: "Weight",
  },
  {
    accessorKey: "purchasedAt",
    header: "Purchase Price",
    cell: ({ row }) => {
      //if purchasedAt is lower than price, then make it red
      const account = row.original;
      if (account.purchasedAt < account.price) {
        return <span className="text-green-500 ">{account.purchasedAt}</span>;
      }
      return <span>{account.purchasedAt}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Current Price",
  },
  {
    accessorKey: "buybackPrice",
    header: "Buyback Price",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      //disabling the sell button if the purchased weight is 0
      const account = row.original;

      if (account.purchasedWeight === 0) {
        return (
          <p disabled className="cursor-not-allowed text-red-500">
            Sold Out
          </p>
        );
      }

      const { user } = useUserStore();
      return <TradeModal data={account} userID={user._id} />;
    },
  },
];
