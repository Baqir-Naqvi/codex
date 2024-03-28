"use client"
import React from "react";
import Information from "./information";
import ShoppingCart from "./shopping-cart";
import PaymentShipping from "./payment-shipping";
import ContactUs from "./contact-us";
import StepNavigation from "./step-navigation";

import { useState, useEffect } from "react";

function Checkout({t,lang}) {
  const [step, setStep] = useState(1);
  const [shipping_details, setShippingDetails] = useState({
    country: "",
    city: "",
    method: "",
    paymentMode: "",
    billing_address: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  return (
    <div className="flex flex-col items-center md:w-[95%] w-full">
      <StepNavigation step={step} setStep={setStep} t={t} />
      <div className="grid md:grid-cols-4 gap-4 w-full">
        <div className="col-span-3">
          {step === 1 ? (
            <ShoppingCart />
          ) : step === 2 ? (
            <PaymentShipping
              shipping_details={shipping_details}
              setShippingDetails={setShippingDetails}
              t={t}
            />
          ) : step === 3 ? (
            <Information
              shipping_details={shipping_details}
              setShippingDetails={setShippingDetails}
              t={t}
            />
          ) : null}
        </div>
        <div className="col-span-1">
          <ContactUs
            t={t}
            setStep={setStep}
            step={step}
            shipping_details={shipping_details}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
