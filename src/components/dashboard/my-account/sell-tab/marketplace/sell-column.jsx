"use client";
import { Button } from "@/components/ui/button";
import { useMarketPlaceStore } from "@/store/useCart";
import { Input } from "@/components/ui/input";

export const columns = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "price",
    header: "Actual Price",
  },
  {
    accessorKey: "purchasedQuantity",
    header: "Number of Units I own",
  },
  {
    header: "My Margin in %",
    //user would input this value
    cell: ({ row }) => {
      const { market_products, setMarketProducts } = useMarketPlaceStore();
      const order = row.original;
      return (
        <Input
          type="number"
          placeholder="Enter your margin"
          defaultValue={
            market_products.find(
                (product) =>
                    product._id === order._id && product.orderID === order.orderID
            )?.margin || 0
            }
          onChange={(e) => {
            setMarketProducts(
              market_products.map((product) =>
                product._id === order._id && product.orderID === order.orderID
                  ? { ...product, margin: e.target.value }
                  : product
              )
            );
          }}
          //cannot be negative
          min="0"
        />
      );
    },
  },
  {
    header: "I want to sell [pcs]",
    // accessorKey: "purchasedQuantity",
    cell: ({ row }) => {
      const order = row.original;
      const { market_products, setMarketProducts } = useMarketPlaceStore();
      return (
        <div className="flex items-center">
          <Button
            disabled={
              market_products.find(
                (product) =>
                  product._id === order._id && product.orderID === order.orderID
              )?.quantity_to_sell == 0 ||
              !market_products.find(
                (product) =>
                  product._id === order._id && product.orderID === order.orderID
              )
            }
            onClick={() => {
              //if item _id quantity_to_sell is 1 then remove it from the market_products
              if (
                market_products.find(
                  (product) =>
                    product._id === order._id &&
                    product.orderID === order.orderID
                )?.quantity_to_sell === 1
              ) {
                setMarketProducts(
                  market_products.filter((product) =>
                    product._id === order._id &&
                    product.orderID === order.orderID
                      ? false
                      : true
                  )
                );
              } else {
                console.log("running this else block");
                setMarketProducts(
                  market_products.map((product) =>
                    product._id === order._id &&
                    product.orderID === order.orderID
                      ? {
                          ...product,
                          quantity_to_sell: product.quantity_to_sell - 1,
                        }
                      : product
                  )
                );
              }
            }}
          >
            -
          </Button>
          <p className="text-sm font-semibold h-8 w-8 text-center items-center justify-center flex">
            {/* {value} */}
            {market_products.find(
              (product) =>
                product._id === order._id && product.orderID === order.orderID
            )?.quantity_to_sell || 0}
          </p>
          <Button
            //if quantity_to_sell is == purchasedQuantity then disable the button
            disabled={
              market_products.find(
                (product) =>
                  product._id === order._id && product.orderID === order.orderID
              )?.quantity_to_sell === order.purchasedQuantity
            }
            onClick={() => {
              //if item _id is not in market_products then add it to market_products
              if (
                !market_products.find(
                  (product) =>
                    product._id === order._id &&
                    product.orderID === order.orderID
                )
              ) {
                setMarketProducts([
                  ...market_products,
                  {
                    ...order,
                    quantity_to_sell: 1,
                    margin: order.margin,
                  },
                ]);
              } else {
                setMarketProducts(
                  market_products.map((product) =>
                    product._id === order._id &&
                    product.orderID === order.orderID
                      ? {
                          ...product,
                          quantity_to_sell: product.quantity_to_sell + 1,
                        }
                      : product
                  )
                );
              }
            }}
          >
            +
          </Button>
        </div>
      );
    },
  },
];
