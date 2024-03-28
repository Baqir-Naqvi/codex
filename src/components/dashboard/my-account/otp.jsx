import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function OTP({ t,callback}) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setOtp(e);
  };

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(async () => {
      callback();
      setLoading(false);
    }, 2000);
  };

  

  return (
    <div className="flex flex-col md:w-[450px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t.myaccount.otp.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 items-center">
            <InputOTP maxLength={6} onChange={handleChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <CardDescription>{t.myaccount.otp.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={otp.length < 6 || loading}
            onClick={handleVerify}
          >
            {t.continue}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OTP;
