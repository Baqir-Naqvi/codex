"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useConversionStore } from "@/store/conversionStore";

function InventoryModal({ t, selectedProducts, setSelectedProducts, user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, rate, weight, weightLabel } = useConversionStore();

  useEffect(() => {
    fetch(`/api/user/inventory?user_id=${user._id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setProducts(
            result.orders.map((product) => ({
              ...product,
              weight_to_sell: 0,
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

  const handleAddToList = (product) => {
    //if product is already in the list then increase the quantity
    if (selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p._id === product._id && p.orderID === product.orderID
            ? { ...p, weight_to_sell: p.weight_to_sell + 1}
            : p
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, weight_to_sell: 1 },
      ]);
    }
  };

  const handleRemoveFromList = (_id) => {
    //if quantity is more than 1 then decrease the quantity
    //if quantity is 1 then remove the product from the list
    if (selectedProducts.some((p) => p._id === _id && p.orderID === p.orderID)) {
      if (selectedProducts.find((p) => p._id === _id).weight_to_sell > 1) {
        setSelectedProducts(
          selectedProducts.map((p) =>
            p._id === _id ? { ...p, weight_to_sell: p.weight_to_sell - 1 } : p
          )
        );
      } else {
        setSelectedProducts(selectedProducts.filter((p) => p._id !== _id));
      }
    }
  };

  return (
    <div className="flex flex-col items-center items-center max-w-7xl">
      <Dialog>
        <DialogTrigger className="w-full bg-black text-white p-2 rounded-md text-center cursor-pointer hover:bg-gray-800">
          {t.myaccount.buy.selectproduct}
        </DialogTrigger>
        <DialogContent className=" max-h-[700px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.myaccount.sell.title}</DialogTitle>
            <DialogDescription>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error.message}</p>
              ) : (
                products.map((product, index) => (
                  <div
                    className="flex flex-row w-full  bg-white border-b border-gray-200 justify-between items-center p-4"
                    key={index}
                  >
                    <img
                      src={product.photos[0]}
                      alt="product"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-md text-black font-semibold">
                        {product.name}
                      </p>
                      <p className="text-md font-bold">
                        {currency} {(product.price / rate).toFixed(2)}
                      </p>
                      <p className="text-md font-bold">
                        {(product.weight / weight).toFixed(2)} {weightLabel}
                      </p>
                    </div>
                    <div className="flex items-center ">
                      <div className="flex flex-row">
                        <Button
                          className=" h-8 w-8"
                          onClick={() => {
                            handleRemoveFromList(product._id);
                          }}
                          disabled={
                            !selectedProducts.some((p) => p._id === product._id && p.orderID === product.orderID)
                          }
                        >
                          {" "}
                          -
                        </Button>
                        <p className="text-sm font-semibold h-8 w-8 text-center items-center justify-center flex">
                          {selectedProducts.some((p) => p._id === product._id && p.orderID === product.orderID)
                            ? selectedProducts.find(
                                (p) => p._id === product._id
                              ).weight_to_sell
                            : 0}
                        </p>
                        <Button
                          className=" h-8 w-8"
                          onClick={() => {
                            handleAddToList(product);
                          }}
                          disabled={
                            //purchasedQuantity < quantity
                            (selectedProducts.some(
                              (p) =>
                                p._id === product._id &&
                                p.orderID === product.orderID
                            ) &&
                              selectedProducts.find(
                                (p) => p._id === product._id && p.orderID === product.orderID
                              ).weight_to_sell >= product.purchasedWeight) ||
                            product.status === "pending"
                          }
                        >
                          {" "}
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InventoryModal;