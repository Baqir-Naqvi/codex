import React from 'react'
import ProductCard from "@/components/shared/ProductCard";

function ProductsContainer({ products,disable,t}) {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} disable={disable} t={t}/>
        ))}
    </div>
  )
}

export default ProductsContainer