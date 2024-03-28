import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function PaymentShipping({ shipping_details, setShippingDetails, t }) {

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-col gap-x-4 border-[1px] border-gray-200 p-4 mt-10">
        <h3 className="text-lg font-semibold mb-5">
          1. Basic Order Information
        </h3>

        {/* two dropdowns for country and City */}
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col w-1/2">
            <Label className="my-2">Country</Label>
            <Select onValueChange={(e) => {
              setShippingDetails({
                ...shipping_details,
                country: e
              })
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country"/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Country</SelectLabel>
                  <SelectItem value="czech-republic">Czech Republic</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="spain">Spain</SelectItem>
                  <SelectItem value="italy">Italy</SelectItem>
                  <SelectItem value="poland">Poland</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col w-1/2">
            <Label className="my-2">City</Label>
            <Select onValueChange={(e) => {
              setShippingDetails({
                ...shipping_details,
                city: e
              })
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a City</SelectLabel>
                  <SelectItem value="prague">Prague</SelectItem>
                  <SelectItem value="brno">Brno</SelectItem>
                  <SelectItem value="ostrava">Ostrava</SelectItem>
                  <SelectItem value="plzen">Plzen</SelectItem>
                  <SelectItem value="liberec">Liberec</SelectItem>
                  <SelectItem value="pardubice">Pardubice</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-x-4 border-[1px] border-gray-200 px-4 py-5 mt-10">
        <h3 className="text-lg font-semibold mb-5">
          2. Choose a delivery method
        </h3>
        <RadioGroup defaultValue="option-one" onValueChange={(e) => {
          setShippingDetails({
            ...shipping_details,
            method: e
          })
        }}>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem
              value="Ceska Posta - Balik do ruky"
              id="ceska-posta"
            />
            <Label htmlFor="ceska-posta">Ceska Posta - Balik do ruky</Label>
          </div>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem
              value="Ceska Posta - Balik na postu"
              id="ceska-posta-posta"
            />
            <Label htmlFor="ceska-posta-posta">
              Ceska Posta - Balik na postu
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem value="PPL" id="ppl" />
            <Label htmlFor="ppl">PPL</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-x-4 border-[1px] border-gray-200 px-4 py-5 mt-10">
        <h3 className="text-lg font-semibold mb-5">
          3. Choose a payment method
        </h3>
        <RadioGroup defaultValue="option-one" onValueChange={(e) => {
          setShippingDetails({
            ...shipping_details,
            paymentMode: e,
          });  
        }
        }>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem value="Credit Card" id="credit-card" />
            <Label htmlFor="credit-card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem value="Dobirkou" id="dobirkou" />
            <Label htmlFor="dobirkou">Dobirkou</Label>
          </div>
          <div className="flex items-center space-x-2 p-5 border-[1px] border-gray-200">
            <RadioGroupItem value="Prevodem" id="Prevodem" />
            <Label htmlFor="Prevodem">Prevodem</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default PaymentShipping;
