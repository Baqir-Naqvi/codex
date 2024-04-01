import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AccountSales from "@/components/admin/sales/account/index";
import EshopSales from "@/components/admin/sales/eshop/index";


function index() {
  return (
    <div className="w-full flex flex-col px-10">
      <Tabs defaultValue="account">
        <TabsList className="grid w-[400px] grid-cols-2 mx-auto">
          <TabsTrigger value="account">User Sales</TabsTrigger>
          <TabsTrigger value="eshop">Marketplace Sales</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-full">
          <AccountSales />
        </TabsContent>
        <TabsContent value="eshop" className="w-full">
          <EshopSales />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default index