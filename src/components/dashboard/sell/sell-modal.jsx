import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import {useToast} from "@/components/ui/use-toast";
import { useTradeStore } from "@/store/useTrade";
function TradeModal({ data, userID }) {
  const [productData, setProductData] = useState(data);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [weight_sell, setWeightSell] = useState(0);
  const { toast } = useToast();
  const { tradingProducts, setTradingProducts } = useTradeStore();



  // original price - % of buyback price from original price
  //if buyback price is 20 then it means original price - 20% of original price
  // productPrice.price and productPrice.buybackPrice
  const buybackCut =
    productData.price - (productData.buybackPrice / 100) * productData.price;
  useEffect(() => {
    setProductData(data);
  }, []);

  const sell_weight = (e) => {
    //if weight is greater than purchased weight
    if (weight_sell > productData.purchasedWeight) {
        toast({
            title: "Insufficient weight",
            description: "You do not have enough weight to sell",
            variant: "destructive",
        });
        return;
    }
    fetch("/api/user/sell", {
      method: "PUT",
      body: JSON.stringify({
        userId: userID,
        productId: productData._id,
        weight: weight_sell,
        sellingPrice: sellingPrice,
        orderID: productData.orderID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          toast({
            title: "Product Sold",
            description: data.message,
          });
          //update the trading products
          const updatedProducts = tradingProducts.map((product) => {
            if (product._id === productData._id) {
              product.purchasedWeight -= weight_sell;
            }
            return product;
          });
          setTradingProducts(updatedProducts);
        } else {
          toast({
            title: "Failed to Sell Product",
            description: data.message,
            variant: "destructive",
          });
          e;
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Failed to Sell Product",
          description: e.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Sell {productData.name} -{" "}
            <span className="text-sm text-gray-500">
              Order {productData.orderID + 1}
            </span>
          </DialogTitle>
          <DialogDescription>
            Select the quantity you want to sell
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left col-span-2">
              Current Price
            </Label>
            <Input value={productData.price} readOnly className="col-span-2" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left col-span-2">
              Selling Price
            </Label>
            <Input value={sellingPrice} readOnly className="col-span-2" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left col-span-2">
              Weight
            </Label>
            <Input
              id="name"
              value={weight_sell}
              min={0}
              type="number"
              max={productData.purchasedWeight}
              onChange={(e) => {
                setSellingPrice(
                  (e.target.value / productData.purchasedWeight) * buybackCut
                );
                setWeightSell(e.target.value);
              }}
              className="col-span-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={sell_weight} disabled={weight_sell === 0} className="w-full"
          >Sell</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TradeModal;
