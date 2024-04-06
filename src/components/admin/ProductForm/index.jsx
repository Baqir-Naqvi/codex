"use client";
import React, { useState, useEffect } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loader from "@/components/shared/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";



function ProductForm({ t }) {
  const _ProductFields = [
    {
      name: "metal",
      type: "select",
      required: true,
      label: `${t.admin.product.metal} *`,
    },
    {
      name: "type",
      type: "radiogroup",
      required: true,
      label: `${t.admin.product.type} *`,
    },
    {
      name: "actual_price",
      type: "number",
      required: true,
      label: `${t.admin.product.actualPrice} *`,
    },
    {
      name: "price_per_gram",
      type: "number",
      required: true,
      readOnly: true,
      label: `${t.admin.product.pricePerGram} *`,
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: `${t.admin.product.name} *`,
    },
    {
      name: "photos",
      type: "file",
      required: true,
      label: `${t.admin.product.photos} *`,
    },
    {
      name: "description",
      type: "text",
      required: true,
      label: `${t.admin.product.description} *`,
    },
    {
      name: "price",
      type: "number",
      readOnly: true,
      required: true,
      label: `${t.admin.product.price} *`,
    },
    {
      name: "VAT",
      type: "number",
      required: true,
      label: "VAT *",
    },
    {
      name: "weight",
      type: "number",
      required: true,
      label: `${t.admin.product.weight} *`,
    },
    {
      name: "buybackPrice",
      type: "number",
      required: true,
      label: `${t.admin.product.buybackPrice} *`,
    },

    {
      name: "product_code",
      type: "text",
      required: true,
      label: `${t.admin.product.productCode} *`,
    },

    {
      name: "percentage_margin",
      type: "number",
      required: true,
      label: `${t.admin.product.percentageMargin} *`,
    },
    {
      name: "fixed_margin",
      type: "number",
      required: true,
      label: `${t.admin.product.fixedMargin} *`,
    },

    {
      name: "purity",
      type: "number",
      required: true,
      label: `${t.admin.product.purity} *`,
    },
  ];

  function onSubmit(values) {
    setLoading(true);
    fetch("/api/admin/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast({
            title: "Product Added",
            description: "Product has been added",
          });
          setLoading(false);
        } else {
          toast({
            title: "Product Failed",
            description: data.message,
            variant: "destructive",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        toast({
          title: "Product Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
      });
  }
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    name: z.string(),
    photos: z.array(z.string()),
    description: z.string(),
    price: z.any().refine((data) => data > 0, {
      message: "Price must be greater than 0",
    }),

    VAT: z.any().refine((data) => data >= 0, {
      message: "VAT must be greater than or equal to 0",
    }),

    weight: z.any().refine((data) => data > 0, {
      message: "Weight must be greater than 0",
    }),

    buybackPrice: z.any().refine((data) => data > 0, {
      message: "Buyback Price must be greater than 0",
    }),

    price_per_gram: z.any().refine((data) => data > 0, {
      message: "Price per gram must be greater than 0",
    }),

    product_code: z.string(),
    actual_price: z.any().refine((data) => data >= 0, {
      message: "Actual Price must be greater than 0",
    }),

    percentage_margin: z.any().refine((data) => data >= 0, {
      message: "Percentage Margin must be greater than 0",
    }),

    fixed_margin: z.any().refine((data) => data >= 0, {
      message: "Fixed Margin must be greater than 0",
    }),

    type: z.string(),
    purity: z.any().refine((data) => data >= 0, {
      message: "Purity must be greater than 0",
    }),

    metal: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      photos: [],
      description: "",
      price: 0,
      VAT: 0,
      weight: 0,
      buybackPrice: 0,
      price_per_gram: 0,
      product_code: "",
      actual_price: 0,
      percentage_margin: 0,
      fixed_margin: 0,
      type: "",
      purity: 0,
      metal: "",
    },
    //auto calculate price per gram
    shouldUnregister: false,
    
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify({ key: "value" }));
    formData.append("requireSignedURLs", "false");
    console.log("Uploading image to Cloudflare...");

    fetch("/api/auth/cloudflare", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // field.onChange([...field.value, data.imageURL]);
        form.setValue("photos", [...form.getValues("photos"), data.imageURL]);

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
  };

  // border-gradient-to-r from-blue-400 to-violet-400
  return (
    <Form {...form}>
      {loading && <Loader message={"Please wait"} />}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3 gap-5 justify-center mt-2">
          {_ProductFields.map((item, index) => (
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
                          multiple
                          onChange={async (e) => {
                            //handle multiple files
                            const promises = [];
                            for (const file of e.target.files) {
                              promises.push(uploadFile(file));
                            }
                            await Promise.all(promises);
                          }}
                        />
                      ) : item.type == "select" ? (
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={item.label} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Metal</SelectLabel>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="silver">Silver</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : item.type == "radiogroup" ? (
                        <RadioGroup
                          defaultValue="coin"
                          className="flex flex-row gap-x-4 items-center text-center pt-2"
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <div className="flex space-x-2 items-center text-center">
                            <RadioGroupItem value="bar" id="r2" />
                            <Label htmlFor="r2">Bar</Label>
                          </div>
                          <div className="flex space-x-2 items-center text-center">
                            <RadioGroupItem value="coin" id="r3" />
                            <Label htmlFor="r3">Coin</Label>
                          </div>
                        </RadioGroup>
                      ) : (
                        <Input
                          type={item.type}
                          readOnly={item.readOnly}
                          className={`${item.readOnly ? "bg-gray-100 cursor-not-allowed" : ""} border-black`}
                          placeholder={item.placeholder}
                          onChange={field.onChange}
                          value={field.value}
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
        <div className="flex flex-row items-center justify-end mt-5">
          <Button
            type="submit"
            className="w-max px-4 bg-black ml-0"
            disabled={loading}
          >
            {loading ? `${t.admin.product.wait}` : `${t.admin.product.add}`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
