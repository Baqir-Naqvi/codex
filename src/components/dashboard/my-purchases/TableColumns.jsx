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

export const columns = [
  {
    accessorKey: "orderID",
    header: "Order ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "purchasedWeight",
    header: "Weight",
  },
  {
    accessorKey: "purchasedAt",
    header: "Purchase Price",
    cell: ({ row }) => {
      //if purchasedAt is lower than price, then make it red
      const account = row.original;
      if (account.purchasedAt < account.price) {
        return <span className="text-green-500 ">{account.purchasedAt}</span>;
      }
      return <span>{account.purchasedAt}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Current Price",
  },
  {
    accessorKey: "buybackPrice",
    header: "Buyback Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;
      const router = useRouter();
      const { toast } = useToast();
      const [loading, setLoading] = useState(false);
      if (loading) return <Loader />;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <a href={`/en/dashboard/product/${account._id}`}>View Product</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
