"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Summary({ data }) {
//ignore products that have status == pending

const purchasePrice = data?.reduce((acc, curr) => {
  if(curr.status === "pending") return acc;
  return acc + curr.purchasedAt;
} , 0);

const actualPrice = data?.reduce((acc, curr) => {
  if (curr.status === "pending") return acc;
  return acc + curr.price;
} , 0);


const totalWeight = data?.reduce((acc, curr) => {
  if (curr.status === "pending") return acc;
  return acc + curr.purchasedWeight; 
} , 0);

  return (
    <div className="w-full flex flex-row justify-between ">
      <Card className="w-[300px] text-center">
        <CardHeader>
          <CardTitle>Purchase Price</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {purchasePrice}
            
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            This is a summary of your purchases
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[300px] text-center">
        <CardHeader>
          <CardTitle>Actual Price</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {actualPrice}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
           Current price of your purchases
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[300px] text-center">
        <CardHeader>
          <CardTitle>Total Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {totalWeight}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            This is a summary of your purchases
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Summary;
