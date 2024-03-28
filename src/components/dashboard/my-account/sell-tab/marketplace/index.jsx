import React from "react";
import MyProductsTable from "@/components/admin/UsersTable";
import { columns } from "./sell-column";
import { useEffect, useState } from "react";
import TableSkeleton from "./_loader";
import { Button } from "@/components/ui/button";
import { useMarketPlaceStore } from "@/store/useCart";
import { margin_starting_columns } from "./margin-starting";
import BankDetails from "@/components/dashboard/my-account/bank-details";
import OTP from "../../otp";
import { useToast } from "@/components/ui/use-toast";


function index({ user, t }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const { market_products } = useMarketPlaceStore();
  const { toast } = useToast();


  useEffect(() => {
    fetch(`/api/user/inventory?user_id=${user._id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProducts(
            result.orders.map((product) => ({
              ...product,
              weight_to_sell: 0,
              quantity_to_sell: 0,
              margin: 0,
            }))
          );
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, []);

  const list_on_marketplace = () => {
    fetch("/api/user/sell", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products_to_sell: market_products,
        type: "marketplace",
        userId: user._id,
      }),
    }).then((res) => {
      if (res.status === 200) {
        toast({
          title: "Products listed",
          description: "Your products have been listed on the marketplace",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex flex-col w-full min-w-[450px] mx-auto">
      {loading ? (
        <TableSkeleton />
      ) : step === 0 ? (
        <MyProductsTable data={products} columns={columns} />
      ) : step === 1 ? (
        <MyProductsTable
          data={market_products}
          columns={margin_starting_columns}
        />
      ) : step === 2 ? (
        <div className="flex flex-col space-y-4 md:w-[450px] mx-auto border p-4 rounded-md mt-5">
          <BankDetails t={t} user={user} />
        </div>
      ) : (
        <div className="mt-5">
        <OTP t={t} callback={
           () => {
            list_on_marketplace();
            setStep(0);
           }
        } />
        </div>
      )}
    {step < 3  && (
      <div className="flex justify-end mt-4 gap-x-2">
        <Button
          className="px-10 py-2"
          disabled={step === 0}
          onClick={() => {
            setStep(step - 1);
          }}
        >
          Back
        </Button>

        <Button
          className="px-10 py-2"
          onClick={() => {
            setStep(step + 1);
          }}
        >
          Next
        </Button>
      </div>
    )}
    </div>
  );
}

export default index;
