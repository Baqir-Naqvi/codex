import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AccountPurchases from "@/components/admin/purchases/account/index";
import EshopPurchases from "@/components/admin/purchases/eshop/index";


function index() {
  return (
    <div className="w-full flex flex-col px-10">
      <Tabs defaultValue="account">
        <TabsList className="grid w-[400px] grid-cols-2 mx-auto">
          <TabsTrigger value="account">User Purchases</TabsTrigger>
          <TabsTrigger value="eshop">EShop Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full ">
          <AccountPurchases />
        </TabsContent>
        <TabsContent value="eshop" className="w-full">
          <EshopPurchases />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default index