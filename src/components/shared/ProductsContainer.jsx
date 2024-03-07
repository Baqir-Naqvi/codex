import React from 'react'
import ProductCard from "@/components/shared/ProductCard";

function ProductsContainer({ products,disable,t}) {
  return (
    <div className="flex w-full flex-wrap gap-5 md:px-5">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} disable={disable} t={t}/>
        ))}
    </div>
  )
}

export default ProductsContainer