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
function TradeModal({ data, userID, userAccountID }) {
  const [productData, setProductData] = useState(data);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [weight_sell, setWeightSell] = useState(0);
  const { toast } = useToast();
  const { tradingProducts, setTradingProducts } = useTradeStore();
  const [receiverID, setReceiverID] = useState(0);
  const [isBuyerVerified, setIsBuyerVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  //817851612
  // original price - % of buyback price from original price
  //if buyback price is 20 then it means original price - 20% of original price
  // productPrice.price and productPrice.buybackPrice
  const buybackCut =
    productData.price - (productData.buybackPrice / 100) * productData.price;
  useEffect(() => {
    setProductData(data);
  }, []);

  const transfer_weight = (e) => {
    e.preventDefault();
    setLoading(true);

    //if no receiver id is entered
    //if recevier id is less than 6 digits
    if (receiverID.length < 6) {
      toast({
        title: "Invalid Receiver ID",
        description: "Please enter a valid receiver ID",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    //if weight is greater than purchased weight
    if (weight_sell > productData.purchasedWeight) {
      toast({
        title: "Insufficient weight",
        description: "You do not have enough weight to sell",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    //if transfer id is same as user uniqueNumber
    if (receiverID == userAccountID) {
      toast({
        title: "Invalid Receiver ID",
        description: "You cannot transfer to yourself",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    fetch(`/api/user/transfer?receiverID= ${receiverID}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: userID,
        productId: productData._id,
        product: productData,
        weight: weight_sell,
        price: sellingPrice,
        orderNumber: productData.orderID,
        userAccountID: userAccountID,
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
          setLoading(false);
          const updatedProducts = tradingProducts.map((product) => {
            if (product._id === productData._id) {
              product.purchasedWeight -= weight_sell;
            }
            return product;
          });
          setTradingProducts(updatedProducts);
        } else {
          toast({
            title: "Failed to Transfer Product",
            description: data.message,
            variant: "destructive",
          });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Failed to Transfer Product",
          description: e.message,
          variant: "destructive",
        });
        setLoading(false);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Transfer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Transfer {productData.name} -{" "}
            <span className="text-sm text-gray-500">
              Order {productData.orderID + 1}
            </span>
          </DialogTitle>
          <DialogDescription>
            Select the quantity you want to transfer
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left col-span-2">
              Receiver ID
            </Label>
            <Input
              id="name"
              value={receiverID}
              onChange={(e) => setReceiverID(e.target.value)}
              className="col-span-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={transfer_weight}
            disabled={weight_sell === 0 || loading || receiverID.length < 6}
          >
            {loading ? "Transferring" : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TradeModal;
