"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ConfirmDetails({t,user,setStep}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t.myaccount.sell.confirmDetails}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col space-y-2">
                <Label>{t.myaccount.sell.firstName}</Label>
                <Input value={user.firstName} disabled />
              </div>
              <div className="flex flex-col space-y-2">
                <Label>{t.myaccount.sell.lastName}</Label>
                <Input value={user.lastName} disabled />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label>{t.myaccount.sell.phoneNumber}</Label>
              <Input value={user.phoneNumber} disabled />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>{t.myaccount.sell.address}</Label>
              <Input value={user.address} disabled />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>{t.myaccount.sell.email}</Label>
              <Input value={user.email} disabled />
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={() => setStep(3)}> {t.continue}</Button>
        </CardFooter>
      </Card>
    </div>
  );

}

export default ConfirmDetails;
