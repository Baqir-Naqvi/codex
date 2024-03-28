"use client";
import { useConversionStore } from "@/store/conversionStore";
import { useTradeStore } from "@/store/useTrade";
import { useMarketPlaceStore } from "@/store/useCart";

export const margin_starting_columns = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    header: "Starting Price",
    cell: ({ row }) => {
    const { market_products} = useMarketPlaceStore();
    const { rate } = useConversionStore();
    //starting price is the price of the product in the market + margin in % of the user
    const order = row.original;
    const product = market_products.find((product) => product._id === order._id);
    if (!product) return 0;
    return ((product.price + (product.price * product.margin) / 100)/rate).toFixed(2); 
      
    },
  },
  {
    header: "My Margin in %",
    accessorKey: "margin",
  },
  {
    header: "I want to sell [pcs]",
    accessorKey: "quantity_to_sell",
  },
];
