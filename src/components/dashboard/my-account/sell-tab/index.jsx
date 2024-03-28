"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import SellImmendiatly from "./sell-immediately";
import SellMarketplace from "./marketplace";
import { useUserStore } from "@/store/userStore";

function SellTab({ t }) {
  const [sellType, setSellType] = useState("Immendiately");
  const { user } = useUserStore();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-4 md:w-[450px] mx-auto">
        <h2 className="text-2xl font-bold my-4">{t.myaccount.sell.title}</h2>
        <RadioGroup
          defaultValue="Immendiately"
          className="flex flex-row space-x-2"
          onValueChange={(value) => setSellType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Immendiately" id="r2" />
            <Label htmlFor="r2">{t.myaccount.sell.immediately}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Markerplace" id="r3" />
            <Label htmlFor="r3">{t.myaccount.sell.marketplace}</Label>
          </div>
        </RadioGroup>
      </div>
      {sellType === "Immendiately" ? (
        <SellImmendiatly t={t} user={user} />
      ) : (
        <SellMarketplace t={t} user={user} />
      )}
    </div>
  );
 
}

export default SellTab;
