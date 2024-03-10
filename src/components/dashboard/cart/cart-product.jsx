import React from 'react'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/userStore'
import { useToast } from '@/components/ui/use-toast'

function CartProduct({product, callback}) {
  const { toast } = useToast();
  const user = useUserStore((state) => state.user);

  const handleRemove = () => {
    fetch("/api/user/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user._id,
        product_id: product._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
        callback(product._id);
        toast({
          title: "Product Removed",
          description: "Product has been removed from cart",
        });
      }
      })
      .catch((error) => {
        toast({
          title: "Failed to Remove Product",
          description: error.message,
          variant: "destructive",
        });
        console.log(error);
      });
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center gap-4 rounded-md">
        <img
          src={product.photos[0]}
          alt="product"
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="text-md font-semibold">{product.name}</h3>
          <p className="text-md font-bold">${product.price}</p>
          <p className="text-sm font-semibold">Quantity: {product.quantity}</p>

          </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
         className="bg-black text-white"
          onClick={handleRemove}
        >Remove</Button>
      </div>
    </div>
  );
}

export default CartProduct