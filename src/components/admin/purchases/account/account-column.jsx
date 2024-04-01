"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleDelete } from "@/components/admin/UsersTable/index";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const columns = [
  {
    accessorKey: "orderID",
    header: "Order ID",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <span>
          {account.orderID} <br />
          {new Date(account.purchasedDate).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "fullName",
  },
  {
    header: "Account Number",
    accessorKey: "uniqueCode",
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
    cell: ({ row }) => {
      const account = row.original;
      return <span>{account.paymentMode}</span>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const account = row.original;
      const { toast } = useToast();
      return (
        <Select
          onValueChange={async (e) => {
            const res = await fetch(`/api/admin/purchases?isEShop=false`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: account.userId,
                status: account.status,
                paymentStatus: e,
                paymentMode: account.paymentMode,
                orderID: account.orderID,
                _id: account._id,
              }),
            });
            const data = await res.json();
            if (data.status === 200) {
              toast({
                title: "Payment Status Updated",
                message: "Payment Status has been updated successfully",
              });
            } else {
              toast({
                title: "Payment Status Update Failed",
                message: "Payment Status update failed",
                variant: "destructive",
              });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={account.paymentStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Purchase Status",
    cell: ({ row }) => {
      const account = row.original;
        const { toast } = useToast();
      return (
        <Select
          onValueChange={(e) => {
          
            fetch(`/api/admin/purchases?isEShop=false`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: account.userId,
                status: e,
                paymentStatus: account.paymentStatus,
                paymentMode: account.paymentMode,
                orderID: account.orderID,
                _id: account._id,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === 200) {
                  toast({
                    title: "Status Updated",
                    message: "Status has been updated successfully",
                  });
                } else {
                  toast({
                    title: "Status Update Failed",
                    message: "Status update failed",
                    variant: "destructive",
                  });
                }
              })
              .catch((error) => {
                toast({
                  title: "Status Update Failed",
                  message: error.message,
                  variant: "destructive",
                });
              });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={account.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      const account = row.original;
      return <span>{account.price * account.quantity}</span>;
    },
  },
];
