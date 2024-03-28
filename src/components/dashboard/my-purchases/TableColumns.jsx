"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { handleDelete } from "@/components/admin/UsersTable/index";
import Loader from "@/components/shared/Loader";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

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
    cell: () => {
      const {user,authReady} = useUserStore();
      return <span>{authReady && user?.firstName  + " " + user?.lastName}</span>;
    },
  },
  {
    header: "Account Number",
    cell: ({ row }) => {
      const {user,authReady} = useUserStore();
      return (
        <span>
          {authReady && user?.accountNumber}
        </span>
      );
    }
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const account = row.original;
      if (account.status === "pending") {
        return <span className="text-red-500">{account.status}</span>;
      }
      return <span>{account.status}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      const account = row.original;
      return <span>{account.purchasedAt * account.quantity}</span>;
    },
  }
];
