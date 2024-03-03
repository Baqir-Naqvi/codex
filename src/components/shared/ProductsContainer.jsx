import React from 'react'
import ProductCard from "@/components/shared/ProductCard";

function ProductsContainer({ products}) {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
  )
}

export default ProductsContainer