import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AccountPurchases from "@/components/admin/purchases/account/index";
import EshopPurchases from "@/components/admin/purchases/eshop/index";


function index() {
  return (
    <div className="w-full flex flex-col px-10">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">User Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full ">
          <AccountPurchases />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default index