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
import { handleDelete } from "@/components/admin/UsersTable/index";
import Loader from "@/components/shared/Loader";
import { useState } from "react";

export const columns = [
  {
    accessorKey: "isVerified",
    header: "Status",
    cell: ({ row }) => {
      return row.original.isVerified ? "Verified" : "Unverified";
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "uniqueCode",
    header: "Account ID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;
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
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(account.uniqueCode);
                toast({
                  title: "Account ID Copied",
                  description:
                    "The account ID has been copied to your clipboard",
                });
              }}
            >
              Copy Account ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                setLoading(true);
                handleDelete(account._id,"user").then((res) => {
                  if (res) {
                    toast({
                      title: "User Deleted",
                      description: "The user has been deleted",
                    });
                    setLoading(false);
                  } else {
                    toast({
                      title: "Error",
                      description: "An error occurred",
                    });
                    setLoading(false);
                  }
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
