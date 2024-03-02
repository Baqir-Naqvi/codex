"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";

function SecondForm({ form, handleRegister, loading }) {
  function onSubmit(values) {
    console.log(values);
    handleRegister(values);
  }
  // border-gradient-to-r from-blue-400 to-violet-400
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col items-center bg-white justify-center py-5 h-[400px] gap-5 rounded-md w-[400px] border-violet-900 border-2"
      >
        <h1 className="text-2xl font-bold text-center text-violet-800 mb-10">
          Register Account
        </h1>

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
              <FormDescription className="text-sm">
                We'll send you a verification email to this address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-center">
          <Button onClick={form.handleSubmit(onSubmit)}
          className="w-max px-4 bg-violet-900 ml-0 hover:bg-violet-700" disable={loading}>
            {loading ? "Please Wait" : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SecondForm;
