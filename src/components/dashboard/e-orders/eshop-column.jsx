"use client";
import { useUserStore } from "@/store/userStore";
import { useConversionStore } from "@/store/conversionStore";

export const columns = [
  {
    accessorKey: "orderID",
    header: "Order ID",
  },
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
        const {currency,rate} = useConversionStore();
      //if purchasedAt is lower than price, then make it red
      const account = row.original;
      if (account.purchasedAt < account.price) {
        return <span className="text-green-500 ">
            {((account.purchasedAt)/rate).toFixed(2)}
             {currency}</span>;
      }
      return (
        <span>
          {" "}
          {(account.purchasedAt / rate).toFixed(2)}
          {currency}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Current Price",
    cell: ({ row }) => {
    const {currency,rate} = useConversionStore();
    const account = row.original;
    return (
      <span>
        {" "}
        {(account.price / rate).toFixed(2)}
        {currency}
      </span>
    );
    }
  },
  {
    accessorKey: "buybackPrice",
    header: "Buyback Price",
    cell: ({ row }) => {
    const {currency,rate} = useConversionStore();
    const account = row.original;
    return (
      <span>
        {" "}
        {(account.buybackPrice / rate).toFixed(2)}
        {currency}
      </span>
    );
    }
  },
  {
    accessorKey:"status",
    header:"Status"
  }
];
