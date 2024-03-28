import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Information({ shipping_details, setShippingDetails, t }) {
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-col gap-x-4 border-[1px] border-gray-200 p-4 mt-10">
        <h3 className="text-lg font-semibold mb-5">1. Personal Data</h3>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              First Name
            </Label>
            <Input placeholder="First Name" className="md:w-[300px] w-full" />
          </div>
          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              Last Name
            </Label>
            <Input placeholder="Last Name" className="md:w-[300px] w-full" />
          </div>

          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              Phone
            </Label>
            <Input
              placeholder="Phone"
              className="md:w-[300px] w-full"
              type="number"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-x-4 border-[1px] border-gray-200 p-4 mt-10">
        <h3 className="text-lg font-semibold mb-5">2. Billing Address</h3>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              Street, House No. *
            </Label>
            <Input placeholder="Street" className="md:w-[300px] w-full" 
             onChange={(e) => { 
              setShippingDetails({
                ...shipping_details,
                billing_address: {
                  ...shipping_details.billing_address,
                  street: e.target.value
                }
              })
            } }/>
          </div>
          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              City *
            </Label>
            <Input placeholder="City" className="md:w-[300px] w-full" 
              onChange={(e) => { 
                setShippingDetails({
                  ...shipping_details,
                  billing_address: {
                    ...shipping_details.billing_address,
                    city: e.target.value
                  }
                })
              } }
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              ZIP *
            </Label>
            <Input placeholder="ZIP" className="md:w-[300px] w-full" 
              onChange={(e) => { 
                setShippingDetails({
                  ...shipping_details,
                  billing_address: {
                    ...shipping_details.billing_address,
                    zip: e.target.value
                  }
                })
              } }
            />
          </div>

          <div className="flex flex-row gap-x-2">
            <Label className="my-2 whitespace-nowrap min-w-[200px]">
              Country *
            </Label>
            <Select onValueChange={(e) => {
              setShippingDetails({
                ...shipping_details,
                billing_address: {
                  ...shipping_details.billing_address,
                  country: e
                }
              }) 
            }
            }>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a country" />
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
        </div>
      </div>
    </div>
  );
}

export default Information