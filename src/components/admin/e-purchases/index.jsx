import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EshopPurchases from "@/components/admin/purchases/eshop/index";

function index() {
  return (
    <div className="w-full flex flex-col px-10">
      <Tabs defaultValue="eshop">
        <TabsList className="mx-auto">
          <TabsTrigger value="eshop">EShop Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="eshop" className="w-full">
          <EshopPurchases />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default index;
