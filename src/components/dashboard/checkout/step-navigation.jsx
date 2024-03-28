import React from 'react'
import {useState, useEffect} from 'react'

function StepNavigation({t, step, setStep}) {
    const [currentStep, setCurrentStep] = useState(1)
    useEffect(() => {
        setCurrentStep(step)
    }, [step])

    const handleStepChange = (step) => {
        setStep(step)
    }   


  return (
    <div className="grid grid-cols-3 gap-4 w-full bg-gray-50 h-[50px]">
      <div
        className={`flex flex-row justify-center gap-x-2 items-center hover:cursor-pointer ${
          currentStep === 1
            ? "text-black font-bolder bg-white border-black border-t-[1px]"
            : "text-gray-300"
        }`}
        onClick={() => handleStepChange(1)}
      >
        1.{" "}
        <div className="text-md">{t.checkout.navigationsteps.shoppingcart}</div>
      </div>
      <div
        className={`flex flex-row justify-center gap-x-2 items-center hover:cursor-pointer ${
          currentStep === 2
            ? "text-black font-bolder bg-white border-black border-t-[1px]"
            : "text-gray-300"
        }`}
        onClick={() => handleStepChange(2)}
      >
        2.{" "}
        <div className="text-md">
          {t.checkout.navigationsteps.shippingpayment}
        </div>
      </div>
      <div
        className={`flex flex-row justify-center gap-x-2 items-center hover:cursor-pointer ${
          currentStep === 3
            ? "text-black font-bolder bg-white border-black border-t-[1px]"
            : "text-gray-300"
        }`}
        onClick={() => handleStepChange(3)}
      >
        3.{" "}
        <div className="text-md">{t.checkout.navigationsteps.information}</div>
      </div>
    </div>
  );
}

export default StepNavigation