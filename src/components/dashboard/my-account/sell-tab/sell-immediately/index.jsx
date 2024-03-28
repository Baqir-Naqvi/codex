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
import InventoryModal from "./inventory-modal";
import { useConversionStore } from "@/store/conversionStore";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import OTP from "../../otp";
import SuccessMessage from "../success";
import ConfirmDetails from "./confirmdetails";
import BankDetails from "@/components/dashboard/my-account/bank-details";

function SellTab({ t ,user}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { currency, rate, weight, weightLabel } = useConversionStore();
  // const { user, authReady } = useUserStore();
  const totalWeight = selectedProducts.reduce((acc, product) => {
    return acc + product.weight_to_sell;
  }, 0);
  const totalCost = selectedProducts.reduce((acc, product) => {
    return acc + product.weight_to_sell * product.price;
  }, 0);

  const [step, setStep] = useState(1);

  const sell_immidiately = async () => {
    fetch("/api/user/sell", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        products_to_sell: selectedProducts,
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
            title: "Failed to Sell Products",
            description: data.message,
            variant: "destructive",
          });
        }
      });
  };

  switch (step) {
    case 1:
      return (
        <div className="flex flex-col md:w-[450px] mx-auto mt-5 w-full">
          <Card>
            <CardContent>
              <div className="flex flex-col space-y-4 py-5">
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
                <div className="flex flex-col space-y-2">
                  <InventoryModal
                    t={t}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    user={user}
                  />
                </div>
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
              <BankDetails t={t} user={user} />
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
          <ConfirmDetails t={t} user={user} setStep={setStep} />
        </div>
      );
    case 3:
      return (
        <div className="flex flex-col md:w-[450px] mx-auto">
          <OTP t={t} setStep={setStep} callback={sell_immidiately} />
        </div>
      );

    case 4:
      return (
        <div className="flex flex-col md:w-[450px] mx-auto">
          <SuccessMessage t={t} />
        </div>
      );
  }
}

export default SellTab;
