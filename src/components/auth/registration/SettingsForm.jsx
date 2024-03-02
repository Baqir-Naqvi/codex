"use client";
import React,{useState,useEffect} from "react";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {useUserStore} from "@/store/userStore"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";
 const _Fields = [
   {
     name: "email",
     type: "text",
     required: true,
     label: "Email *",
     isDisabled: true,
   },
   {
     name: "password",
     type: "password",
     placeholder: "Enter your password",
     required: true,
     label: "Password *",
   },
   {
     name: "firstName",
     type: "text",
     placeholder: "Enter your first name",
     required: true,
     label: "First Name *",
   },
   {
     name: "lastName",
     type: "text",
     placeholder: "Enter your last name",
     required: true,
     label: "Last Name *",
   },
   {
     name: "address",
     type: "text",
     placeholder: "Enter your address",
     required: true,
     label: "Address *",
   },
   {
     name: "phoneNumber",
     type: "text",
     placeholder: "Enter your phone number",
     required: true,
     label: "Phone Number *",
   },
   {
     name: "IDFront",
     type: "file",
     required: false,
     placeholder: "Upload your ID front",
     label: "Front Side of ID",
   },
   {
     name: "IDBack",
     type: "file",
     required: false,
     placeholder: "Upload your ID back",
     label: "Back Side of ID",
   },
   {
     name: "accountNumber",
     type: "text",
     required: false,
     placeholder: "Enter your account number",
     label: "Account Number",
   },
   {
     name: "IBAN",
     type: "text",
     required: false,
     placeholder: "Enter your IBAN",
     label: "IBAN",
   },
   {
     name: "swiftCode",
     type: "text",
     required: false,
     placeholder: "Enter your swift code",
     label: "Swift Code",
   },
   {
     name: "bankName",
     required: false,
     type: "text",
     placeholder: "Enter your bank name",
     label: "Bank Name",
   },
 ];

function SettingsForm() {
  function onSubmit(values) {
    console.log(values);
    setLoading(true);
    fetch("/api/auth/register", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast({
            title: "Profile Updated",
            description: "Your profile has been updated",
          });
          setLoading(false);
        } else {
          toast({
            title: "Profile Update Failed",
            description: data.message,
            variant: "destructive",
          });
          setLoading(false);
        }
      });
  }
  const { user, authReady } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  console.log(user);
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
      email: authReady ? user.email :"",
      password: authReady ? user.password :"",
      firstName: authReady ?user.firstName : "",
      lastName: authReady ? user.lastName : "",
      address: authReady ? user.address : "",
      phoneNumber: authReady ? user.phoneNumber : "",

      //optional fields
      IDFront: "",
      IDBack: "",
      accountNumber: authReady ? user.accountNumber : "",
      IBAN: authReady ? user.IBAN : "",
      swiftCode: authReady ? user.swiftCode : "",
      bankName: authReady ? user.bankName : "",

    },
  });

  //update the form values when the user details are ready
  useEffect(() => {
    if (!authReady) return;
    for (const key in form.getValues()) {
      form.setValue(key, user[key]);
    }
  }, [authReady]);

 
  // border-gradient-to-r from-blue-400 to-violet-400
  return (
    <Form {...form}>
      {loading &&
      <Loader message={"Please wait"}/>
      }
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5 justify-center mt-2">
          {_Fields.map((item, index) => (
            <FormField
              key={index}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <>
                      {" "}
                      <Label htmlFor={index}>{item.label}</Label>
                      {item.type == "file" ? (
                        <Input
                          type={item.type}
                          className="border-black"
                          placeholder={item.placeholder}
                          onChange={(e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            formData.append(
                              "metadata",
                              JSON.stringify({ key: "value" })
                            );
                            formData.append("requireSignedURLs", "false");
                            console.log("Uploading image to Cloudflare...");

                            fetch("/api/auth/cloudflare", {
                              method: "POST",
                              body: formData,
                            })
                              .then((response) => response.json())
                              .then((data) => {
                                field.onChange(data.imageURL);
                                toast({
                                  title: "Upload Successful",
                                  description: "Image has been uploaded",
                                });
                              })
                              .catch((error) => {
                                toast({
                                  title: "Upload Failed",
                                  description: error.message,
                                  variant: "destructive",
                                });
                              });
                          }}
                        />
                      ) : (
                        <Input
                          type={item.type}
                          className="border-black"
                          placeholder={item.placeholder}
                          onChange={field.onChange}
                          value={field.value}
                          disabled={item.isDisabled}
                        />
                      )}
                    </>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-center mt-5">
          <Button
            type="submit"
            className="w-full px-4 bg-violet-900 ml-0"
            disabled={loading}
          >
            {loading ? "Please Wait" : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SettingsForm;
