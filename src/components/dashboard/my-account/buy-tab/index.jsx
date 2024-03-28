"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductsModal from "./products-modal";
import { useConversionStore } from "@/store/conversionStore";
import { useUserStore } from "@/store/userStore";
import { useState,useEffect } from "react";
import OTP from "../otp";
import SuccessMessage from "./success";
function BuyTab({ t ,preSelectedProducts,isMarketplace=false}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { currency, rate, weight, weightLabel } = useConversionStore();
  const { user, authReady } = useUserStore();
  const totalWeight = selectedProducts.reduce((acc, product) => {
    return acc + product.quantity * product.weight;
  }, 0);
  const totalCost = selectedProducts.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (preSelectedProducts) {
      setSelectedProducts(preSelectedProducts);
    }
  }, [preSelectedProducts]);

  const purchaseItems = async () => {
    fetch("/api/product/purchase", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        products: selectedProducts,
        isEshop: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setStep(3);
        } else {
          toast({
            title: "Failed to Purchase Products",
            description: data.message,
            variant: "destructive",
          });
        }
      });
  };

  switch (step) {
    case 1:
       return (
         <div className="flex flex-col md:w-[450px] mx-auto">
           <Card>
             <CardHeader>
               <CardTitle>{t.myaccount.buy.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="flex flex-col space-y-4">
                 <div className="flex flex-col space-y-2">
                   <Label>
                     {t.myaccount.buy.youwillget} ( {weightLabel} )
                   </Label>
                   <Input
                     placeholder="1 g"
                     value={(totalWeight / weight).toFixed(2)}
                     readOnly
                   />
                 </div>
                 {!isMarketplace && (
                 <div className="flex flex-col space-y-2">
                   <ProductsModal
                     t={t}
                     selectedProducts={selectedProducts}
                     setSelectedProducts={setSelectedProducts}
                   />
                 </div>
                  )}
                 <div className="flex flex-col space-y-2">
                   <Label>
                     {t.myaccount.buy.totalcost} {currency}
                   </Label>
                   <Input
                     placeholder="44 "
                     value={(totalCost / rate).toFixed(2)}
                     readOnly
                   />
                 </div>
               </div>

               <div className="flex flex-col space-y-2 mt-3">
                 <Label>{t.myaccount.accountNumber}</Label>
                 <Input value={user?.accountNumber} readOnly />
               </div>
             </CardContent>
             <CardFooter>
               <Button
                 className="w-full"
                 disabled={selectedProducts.length === 0}
                 onClick={() => setStep(2)}
               >
                 {t.continue}
               </Button>
             </CardFooter>
           </Card>
         </div>
       );
    case 2:
      return (
        <div className="flex flex-col md:w-[450px] mx-auto">
          <OTP
            t={t}
            callback={purchaseItems}
          />
        </div>
      );

    case 3:
      return (
        <div className="flex flex-col md:w-[450px] mx-auto">
          <SuccessMessage t={t} />
        </div>
      );
  }
  
 
}

export default BuyTab;
