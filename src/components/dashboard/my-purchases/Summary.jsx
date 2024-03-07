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
  return (
    <div className="w-full flex flex-row justify-between ">
      <Card className="w-[300px] text-center">
        <CardHeader>
          <CardTitle>Number of products</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">{data.length}</CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            This is a summary of your purchases
          </p>
        </CardFooter>
      </Card>

      <Card className="w-[300px] text-center">
        <CardHeader>
          <CardTitle>Total amount</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {data.reduce((acc, curr) => acc + curr.price, 0)}
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
          <CardTitle>Total Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {data.reduce((acc, curr) => acc + curr.weight, 0)}
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
