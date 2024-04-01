"use client";
import React from "react";
import ProductCard from "./product-card";
import BuyTab from "@/components/dashboard/my-account/buy-tab";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {Button} from '@/components/ui/button'
import Link from "next/link";

function Container({ products, t }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [buyType, setBuyType] = useState("Eshop");
  return (
    
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <div className="flex flex-col space-y-4 md:w-[450px] mx-auto">
        <RadioGroup
          defaultValue="Eshop"
          className="flex flex-row space-x-2"
          onValueChange={(value) => setBuyType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Eshop" id="r3" />
            <Label htmlFor="r3">{t.marketplace.transfertomyaddress}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="account" id="r2" />
            <Label htmlFor="r2">{t.marketplace.transfertomyaccount}</Label>
          </div>
        </RadioGroup>
      </div>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          buyType={buyType}
          t={t}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      ))}
      {buyType === "account" ? (
        <BuyTab
          preSelectedProducts={selectedProducts}
          t={t}
          isMarketplace={true}
          purchase_from="marketplace"
        />
      ) : (
        <div className="flex flex-row justify-end w-full p-4">
          <Link href="/dashboard/checkout">
            <Button className="w-full">{t.continue}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Container;
