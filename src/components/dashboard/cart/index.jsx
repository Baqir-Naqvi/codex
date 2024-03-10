import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingCart } from "lucide-react";
import CartProduct from "@/components/dashboard/cart/cart-product";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Cart() {
  const { user, authReady } = useUserStore();
  const [cart, setCart] = useState([]);
  const { toast } = useToast();
  useEffect(() => {

    if (!authReady) return;
    fetch("/api/user/cart?user_id=" + user._id)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  }, [authReady, user]);

  const handleRemoveItem = (product_id) => {
    setCart(cart.filter((product) => product._id !== product_id));
  };

  const purchaseCartItems = () => {
    fetch("/api/product/purchase", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        products: cart,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setCart([]);
          toast({
            title: "Products Purchased",
            description: "Products have been purchased",
          });
        }
        else{
          toast({
            title: "Failed to Purchase Products",
            description: data.message,
            variant: "destructive",
          });
        }
      });
  }

  return (
    <Sheet>
      <span className=" text-[12px] bg-black text-white rounded-full w-5 h-5 flex items-center justify-center absolute top-8 right-2">
        {cart.length}
      </span>
      <SheetTrigger asChild>
        <ShoppingCart color="black" className="hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full justify-between">
        <div>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>Manage your cart items</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {cart.map((product, index) => {
              return (
                <CartProduct
                  key={index}
                  product={product}
                  callback={handleRemoveItem}
                />
              );
            })}
          </div>
        </div>

        <SheetFooter className="flex justify-end">
          <SheetClose asChild>
            <Button 
            onClick={purchaseCartItems}
            >Purchase {cart.length} items</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
