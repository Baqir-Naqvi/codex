import React from "react";
import { useCartStore } from "@/store/useCart";
import { useConversionStore } from "@/store/conversionStore";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/store/userStore";

function ShoppingCart() {
  const { cartProducts, setCartProducts } = useCartStore();
  const { currency, rate } = useConversionStore();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const handleRemove = (_id) => {
    fetch("/api/user/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user._id,
        product_id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setCartProducts(cartProducts.filter((p) => p._id !== _id));
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
  };

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      {cartProducts.map((product, index) => (
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
            <h3 className="text-md font-semibold">{product.name}</h3>
            <p className="text-md font-bold">
              {currency}{" "}
              {((product.price / rate) * product.quantity).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center ">
            <div className="flex flex-row">
              <Button
                className=" h-8 w-8"
                onClick={() => {
                  if (product.quantity > 1) {
                    setCartProducts(
                      cartProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, quantity: p.quantity - 1 }
                          : p
                      )
                    );
                  }
                }}
              >
                {" "}
                -
              </Button>
              <p
                className="text-sm font-semibold h-8 w-8 text-center items-center justify-center flex
                "
              >
                {product.quantity}
              </p>
              <Button
                className=" h-8 w-8"
                onClick={() => {
                  if(product.marketplace_id) {
                    if(product.quantity >= product.quantity_available) {
                      toast({
                        title: "Quantity Exceeded",
                        description: "You can't add more than available quantity",
                        variant: "destructive",
                      });
                      return;
                    
                    }
                    else {
                      setCartProducts(
                        cartProducts.map((p) =>
                          p._id === product._id
                            ? { ...p, quantity: p.quantity + 1 }
                            : p
                        )
                      );
                    }
                  }
                  setCartProducts(
                    cartProducts.map((p) =>
                      p._id === product._id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    )
                  );
                }}
              >
                {" "}
                +
              </Button>
            </div>
          </div>
          <Button
            className="p-2  rounded-md h-8 w-8 "
            onClick={() => {
              handleRemove(product._id);
            }}
          >
            <X size={20} color="#ffffff" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
