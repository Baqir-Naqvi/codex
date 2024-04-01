"use client";
import React from "react";
import ProductCard from "@/components/shared/ProductCard";
import { useEffect, useState } from "react";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

function ProductsContainer({ disable, t }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(products.length > 0) return setLoading(false);
    fetch(`/api/admin/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`flex w-full flex-wrap gap-5 md:px-5 mx-auto ${disable && "justify-center"}`}> 
      {loading ? (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      ) : (
        <>
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              disable={disable}
              t={t}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ProductsContainer;
