"use client";
import React from "react";
import MyMarketPlaceCard from "./card";
import { useState } from "react";
import OTP from "@/components/dashboard/my-account/otp";
import { useToast } from "@/components/ui/use-toast";

function index({ products, t }) {
  const [step, setStep] = useState(1);
  const [delistProduct, setDelistProduct] = useState({});
  const { toast } = useToast();

  const handleDelistProduct = async () => {
    console.log(delistProduct);
    const res = await fetch(`/api/user/marketplace?id=${delistProduct._id}`, {
      method: "PUT",
      body: JSON.stringify({ delistProduct: delistProduct }),
    });
    const data = await res.json();
    const { stats, message } = data;

    if (stats == 200) {
      toast({
        title: "Product Delisted",
        description: "Product has been credited to your account",
      });
      setStep(1);
    } else {
      toast({
        title: "Delist Failed",
        description: message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center  w-full">
      {step == 1 ? (
        <div>
          {products.map((product, index) => (
            <MyMarketPlaceCard
              key={index}
              product={product}
              t={t}
              setStep={setStep}
              setDelistProduct={setDelistProduct}
            />
          ))}
        </div>
      ) : (
        <OTP setStep={setStep} t={t} callback={handleDelistProduct} />
      )}
    </div>
  );
}

export default index;
