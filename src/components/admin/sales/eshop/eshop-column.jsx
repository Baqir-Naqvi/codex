"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleDelete } from "@/components/admin/UsersTable/index";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useConversionStore } from "@/store/conversionStore";

export const columns = [
  {
    accessorKey: "Transaction ID and Date",
    header: "Order ID",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <span>
          {account.marketplace_id} <br />
          {new Date(account.listedOn).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    header: "Seller Details",
    accessorKey: "seller_accountNumber",
  },
  {
    header: "Buyer",
    accessorKey: "buyer_Name",
  },
  {
    header: "Payment Status",
    accessorKey: "payment_status",
    cell: ({ row }) => {
      const account = row.original;
      const { toast } = useToast();
      return (
        <Select
          onValueChange={(e) => {
            fetch(`/api/admin/sales?isEshop=true`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: account._id,
                payment_status: e,
                marketplace_id: account.marketplace_id,
                seller_id: account.seller_id,
                buyer_id: account.buyer_id,
                product : account.product
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
            <SelectValue placeholder={account.payment_status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="pending">Unpaid</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    header:"Transfer Status",
    accessorKey:"transfer_status"
  },
  {
    accessorKey: "order_status",
    header: "Order Status",
    cell: ({ row }) => {
      const account = row.original;
      const { toast } = useToast();
      return (
        <Select
          onValueChange={(e) => {
            fetch(`/api/admin/sales?isEshop=true`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: account._id,
                order_status: e,
                marketplace_id: account.marketplace_id,
                seller_id: account.seller_id,
                buyer_id: account.buyer_id,
                product : account.product
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
            <SelectValue placeholder={account.order_status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "payment_to_seller",
    header: "Payment to Seller",
    cell: ({ row }) => {
      const account = row.original;
      const { toast } = useToast();
      return (
        <Select
          onValueChange={(e) => {
            fetch(`/api/admin/sales?isEshop=true`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: account._id,
                payment_to_seller: e,
                marketplace_id: account.marketplace_id,
                seller_id: account.seller_id,
                buyer_id: account.buyer_id,
                product : account.product
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
            <SelectValue placeholder={account.payment_to_seller} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Update Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
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
      const { currency, rate } = useConversionStore();
      return (
        <span>
          {((account.price * account.quantity) / rate).toFixed(2)} {currency}
        </span>
      );
    },
  },
];
