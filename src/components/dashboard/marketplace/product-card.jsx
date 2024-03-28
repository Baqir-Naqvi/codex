"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useConversionStore } from "@/store/conversionStore";
import { useCartStore } from "@/store/useCart";
import { useState, useEffect } from "react";

function MarketPlaceCard({
  product,
  buyType,
  t,
  selectedProducts,
  setSelectedProducts,
}) {
  const { currency, rate } = useConversionStore();
  const { setCartProducts, cartProducts } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = () => {
    if (buyType === "account") {
      setSelectedProducts([...selectedProducts, product]);
      setIsAdded(true);
    } else {
      setCartProducts([...cartProducts, product]);
      setIsAdded(true);
    }
  };
  const handleRemoveFromCart = (product) => {
    if (buyType === "account") {
      const Products = selectedProducts.filter(
        (item) => item._id !== product._id
      );
      setSelectedProducts(Products);
      setIsAdded(false);
    } else {
      const updatedCart = cartProducts.filter(
        (item) => item._id !== product._id
      );
      setCartProducts(updatedCart);
      setIsAdded(false);
    }
  };
  //if user updates the cart from my-cart
  useEffect(() => {
    const isProductAdded = cartProducts.some(
      (item) => item._id === product._id
    );
    setIsAdded(isProductAdded);
  }, [cartProducts]);

  return (
    //image, name, price, description, seller ,quantity
    <div className="flex flex-row justify-between w-full p-4 my-4 bg-white rounded-md border border-gray-200">
      <div className="flex flex-row items-center">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-600">
            {product.name}
          </h2>
          <span className="text-sm font-semibold text-gray-500">
            {product.description}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-x-10">
        <div className="flex flex-col items-end">
          <p className="text-lg font-bold text-black">
            {(product.price / rate).toFixed(2)} {currency}
          </p>
        </div>

        <div className="flex flex-row items-center">
          {product.isDisabled ? (
            <Button className="min-w-[120px]" disabled>
              My Product
            </Button>
          ) : (
            <Button
              className="min-w-[120px]"
              onClick={() =>
                isAdded
                  ? handleRemoveFromCart(product)
                  : handleAddToCart(product)
              }
            >
              {isAdded ? "Remove" : "Add"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketPlaceCard;
