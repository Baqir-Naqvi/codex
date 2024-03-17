import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {useState, useEffect} from "react";
function TransferTerms() {
    const [verificationCode, setVerificationCode] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


  return (
    <Dialog className="md:w-[525px]">
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black">
          Accept
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Terms </DialogTitle>
          <DialogDescription>
            This Transfer of Terms Agreement ("Agreement") is entered into on
            [Date] by and between [Transferor Name], located at [Transferor
            Address], and [Transferee Name], located at [Transferee Address].
            WHEREAS, Transferor and Transferee are parties to an existing
            agreement ("Original Agreement") dated [Original Agreement Date],
            governing the terms and conditions of their online trading platform
            relationship; WHEREAS, Transferor desires to transfer all rights,
            obligations, and responsibilities under the Original Agreement to
            Transferee, and Transferee agrees to accept such transfer; NOW,
            THEREFORE, in consideration of the mutual covenants and promises
            contained herein, the parties agree as follows:
          </DialogDescription>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms"
               onClick={() => setIsAccepted(!isAccepted)}
             />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <DialogFooter>
           <Button disabled={!isAccepted}
            type="submit"
            >
                Send Verification Code
            </Button>     

          <Button disabled={!isAccepted}
          type="submit"
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TransferTerms


 