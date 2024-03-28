import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyTab from './buy-tab'
import SellTab from './sell-tab'

function AccountTabs({t}) {
  return (
    //buy sell transfer withdraw
    <div className="flex flex-row md:max-w-5xl mt-5">
      <Tabs defaultValue="account" className="w-full justify-between">
        <TabsList className="flex flex-row justify-between ">
          <TabsTrigger value="buy" className="w-full">
            {t.myaccount.tabs.buy}
          </TabsTrigger>
          <TabsTrigger value="sell" className="w-full">
            {t.myaccount.tabs.sell}
          </TabsTrigger>
          <TabsTrigger value="transfer" className="w-full">
            {t.myaccount.tabs.transfer}
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="w-full">
            {t.myaccount.tabs.withdraw}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <BuyTab t={t}/>
        </TabsContent>
        <TabsContent value="sell">
          <SellTab t={t}/>
        </TabsContent>
        <TabsContent value="transfer">Transfer Products</TabsContent>
        <TabsContent value="withdraw">Withdraw Products</TabsContent>
      </Tabs>
    </div>
  );
}

export default AccountTabs