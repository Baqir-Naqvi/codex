"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useConversionStore } from "@/store/conversionStore";

function ProductCard({ product, disable = false, t }) {
  const { currency, rate, weight, weightLabel } = useConversionStore();

  return (
    <Card className="w-[350px] border-[1px] border-slate-300 shadow-md hover:shadow-lg md:h-[500px]">
      <CardContent className="p-0">
        <div className="relative flex w-full flex-col justify-between rounded-md">
          <div className="flex flex-col">
            <Image
              alt={product.name}
              src={product.photos?.[0]}
              className="mx-auto rounded-md hidden md:flex h-[250px]"
              height={400}
              width={400}
            />
            <Image
              alt={product.name}
              src={product.photos?.[0]}
              className="mx-auto rounded-lg md:hidden flex h-[180px]"
              height={400}
              width={400}
            />
          </div>

          <div className="flex flex-col justify-between gap-y-2 px-4 flex-1 h-full">
            <div className="flex flex-col gap-y-3 py-3">
              <h3 className=" text-lg font-bold">{product.name}</h3>{" "}
              <CardDescription className="text-[16px] h-[60px] overflow-hidden">
                {product.description}
              </CardDescription>
              <div className="flex items-center gap-x-2 "></div>
              <div className="flex items-center gap-x-2 wrap">
                <Badge className="px-2 text-[14px] whitespace-nowrap">
                  {currency} : {(product.price / rate).toFixed(2)}
                </Badge>
                <Badge className="px-2 text-[14px] whitespace-nowrap">
                  {t.productCard.weight} :{" "}
                  {(product.weight / weight).toFixed(2)} {weightLabel}
                </Badge>
                <Badge className="px-2 text-[14px] whitespace-nowrap">
                  VAT : {product.VAT}
                </Badge>
              </div>
            </div>
            <CardFooter className="flex w-full  justify-between md:gap-x-5">
              <Heart size={26} className="hover:cursor-pointer" />
              {disable ? (
                <Button disabled={disable}>{t.productCard.addToCart}</Button>
              ) : (
                <Link href={`/dashboard/product/${product._id}`}>
                  <Button>{t.productCard.addToCart}</Button>
                </Link>
              )}
            </CardFooter>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
