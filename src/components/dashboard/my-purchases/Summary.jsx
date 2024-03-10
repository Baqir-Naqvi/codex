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
  //data is an array of arrays containing the purchase history
const purchasePrice = data?.reduce((acc, curr) => {
  const innerTotal = curr.reduce(
    (innerAcc, innerCurr) => innerAcc + innerCurr.purchasedAt,
    0
  );
  return acc + innerTotal;
}, 0);

const actualPrice = data?.reduce((acc, curr) => {
  const innerTotal = curr.reduce(
    (innerAcc, innerCurr) => innerAcc + innerCurr.price,
    0
  );
  return acc + innerTotal;
}
, 0);

const totalWeight = data?.reduce((acc, curr) => {
  const innerTotal = curr.reduce(
    (innerAcc, innerCurr) => innerAcc + innerCurr.weight,
    0
  );
  return acc + innerTotal;
}
, 0);

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
