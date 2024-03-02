"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import SettingsForm from "@/components/auth/registration/SettingsForm";
import { useState } from "react";
import SecondForm from "@/components/auth/registration/SecondForm";

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().max(100).optional(),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    address: z.string().max(100).optional(),
    phoneNumber: z.string().max(100).optional(),

    //optional fields
    IDFront: z.string().optional(),
    IDBack: z.string().optional(),
    accountNumber: z.string().optional(),
    IBAN: z.string().optional(),
    swiftCode: z.string().optional(),
    bankName: z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",

      //optional fields
      IDFront: "",
      IDBack: "",
      accountNumber: "",
      IBAN: "",
      swiftCode: "",
      bankName: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  function handleRegister(values) {
    onSubmit(values);
  }

  function onSubmit(values) {
    setLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          toast({
            title: "Registration Successful",
            description: "Please check your email to verify your account",
            variant: "success",
          });
          setLoading(false);
          router.push("/auth/login");
        } else {
          console.log(data);
          toast({
            title: "Registration Failed",
            description: data.message,
            variant: "destructive",
          });
          setLoading(false);
        }
      });
  }

  // border-gradient-to-r from-blue-400 to-violet-400
  return (
    <div className="flex flex-col items-center justify-center py-5 h-full rounded-md md:w-1/2 w-full w-[350px]">
      <div className=" flex flex-col w-full h-screen absolute -z-10 items-center bg-gradient-to-r from-blue-400 to-violet-400 md:hidden" />
      <SecondForm
        form={form}
        handleRegister={handleRegister}
        loading={loading}
      />
    </div>
  );
}

export default RegisterForm;
