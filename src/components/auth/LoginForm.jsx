"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function LoginForm() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  function onSubmit(values) {
    fetch("/api/auth/login", {
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
                title: "Login Successful",
                description: "You have been logged in",
            });
            router.push("/");
        } else {
          console.log(data);
            toast({
              title: "Login Failed",
              description: data.message,
              variant: "destructive",
            });
        }
      });
  }

  // border-gradient-to-r from-blue-400 to-violet-400
  return (
    <div
      className="flex flex-col items-center justify-center h-[500px] w-full rounded-md md:w-[400px] border-2 border-violet-400
    "
    >
      <h1 className="text-2xl font-bolder text-center text-violet-800">
        Login to Codex
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
                    type="text"
                    placeholder="Enter your email"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormDescription>
                  We'll never share your email with anyone else.
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="flex items-center justify-start gap-2">
            <span className="text-black mt-2 text-sm">
              Don&apos;t have an account?
            </span>
            <Link href="/auth/register">
              <p className="text-violet-800 mt-2 text-sm">Register here</p>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
