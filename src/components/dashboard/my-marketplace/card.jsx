"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useConversionStore } from "@/store/conversionStore";
import { useCartStore } from "@/store/useCart";
import { useState, useEffect } from "react";

function MyMarketPlaceCard({ product, t, setStep, setDelistProduct }) {
  const { currency, rate } = useConversionStore();
  const endOffer = () => {
    setDelistProduct(product);
    setStep(2);
  };

  return (
    //image, name, price, description, seller ,quantity
    <div className="flex flex-row justify-between w-full p-4 my-4 bg-white rounded-md border border-gray-200">
      <div className="flex flex-row items-center w-full">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="ml-4 md:max-w-[500px]">
          <h2 className="text-lg font-semibold text-gray-600">
            {product.name}
          </h2>
          <span className="text-sm font-semibold text-gray-500">
            {product.description}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-x-10">
        <div className="flex flex-col items-end">
          <p className="text-lg font-bold text-black">
            {(product.price / rate).toFixed(2)} {currency}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <Button onClick={endOffer}>
            {t.myaccount.mymarketplace.endoffer}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyMarketPlaceCard;
