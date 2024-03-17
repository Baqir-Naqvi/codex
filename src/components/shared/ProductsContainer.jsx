"use client";
import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { useEffect, useState } from "react";

function ProductsContainer({ disable, t }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/products`,
        { cache: "no-store" },
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      return data;
    };

    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="flex w-full flex-wrap gap-5 md:px-5 mx-auto">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          disable={disable}
          t={t}
        />
      ))}
    </div>
  );
}

export default ProductsContainer;
