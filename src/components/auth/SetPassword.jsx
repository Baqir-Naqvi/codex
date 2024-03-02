"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


function SetPassword({email}) {
  const formSchema = z.object({
    email: z.any(),
    password: z.string().min(6).max(100),
  });
  const { toast } = useToast();
  const router = useRouter();

  function onSubmit(values) {   
    // console.log(values);
    fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
          toast({
            title: "Password Set",
            description: "You have successfully set your password",
          });
          router.push("/auth/login");
      
      }).catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      })
    }

 const form = useForm({
   resolver: zodResolver(formSchema),
   defaultValues: {
     email: email,
     password: "",
   },
 });
  return (
    <div
      className="flex flex-col items-center justify-center h-[500px] w-full rounded-md md:w-[400px] border-2 border-violet-400
    "
    >
      <h1 className="text-2xl font-bolder text-center text-violet-800">
        Set Account Password
      </h1>
      <Form {...form} className="space-y-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    disabled
                    {...field}
                    value={email}
                  />
                </FormControl>
                <FormDescription>
                  Set the password for your account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SetPassword;
