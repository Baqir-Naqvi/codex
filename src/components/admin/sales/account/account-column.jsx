"use client";
import { useConversionStore } from "@/store/conversionStore";
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

export const columns = [
  {
    accessorKey: "orderID",
    header: "Order Code and Date",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <span>
          {account.orderID} <br />
          {new Date(account.createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "seller_name",
  },
  {
    header: "Account Number",
    accessorKey: "seller_accountNumber",
  },

  {
    // accessorKey: "balance",
    header: "Account Balance",
    cell: ({ row }) => {
      const account = row.original;
      const { currency, rate, weight, weightLabel } = useConversionStore();
      return (
        <span>
          {(account.balance / rate).toFixed(2)} {currency}
          <br />
          <span className="text-green-500">
            {(account.account_weight / weight).toFixed(2)} {weightLabel}
          </span>
        </span>
      );
    },
  },
  {
    header: "New Account Balance",
    // accessorKey: "balance", weight_to_sell
    cell: ({ row }) => {
      const account = row.original;
      const { currency, rate, weight, weightLabel } = useConversionStore();
      return (
        <span>
          {(account.balance / rate + account.totalAmount).toFixed(2)}
          {currency}
          <br />
          <span className="text-green-500">
            {(
              (account.account_weight - account.weight_to_sell) /
              weight
            ).toFixed(2)}{" "}
            {weightLabel}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "payment_to_seller",
    header: "Payment Status",
    cell: ({ row }) => {
      const account = row.original;
      const { toast } = useToast();
      return (
        <Select
          onValueChange={async (e) => {
            const res = await fetch(`/api/admin/sales`, {
              method: "PUT",
              body: JSON.stringify({
                sellerId: account.seller_id,
                status: account.status,
                payment_to_seller: e,
                status: e,
                paymentMode: account.paymentMode,
                orderID: account.orderID,
                _id: account._id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
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
            <SelectValue placeholder={account.payment_to_seller} />
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
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const account = row.original;
      const { currency, rate } = useConversionStore();
      return (
        <span>
          {(account.totalAmount / rate).toFixed(2)} {currency}
        </span>
      );
    },
  },
];
