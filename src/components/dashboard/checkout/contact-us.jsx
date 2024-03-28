import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail } from "lucide-react";
import { useConversionStore } from "@/store/conversionStore";
import { useCartStore } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
function ContactUs({ t, setStep, step, shipping_details}) {
  const { cartProducts, setCartProducts } = useCartStore();
  const { currency, rate } = useConversionStore();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const purchaseCartItems = () => {
    fetch("/api/product/purchase", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        products: cartProducts,
        isEshop: true,
        shipping_details,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          // setCart([]);
          setCartProducts([]);
          toast({
            title: "Products Purchased",
            description: "Products have been purchased",
          });
        } else {
          toast({
            title: "Failed to Purchase Products",
            description: data.message,
            variant: "destructive",
          });
        }
      });
  };
  return (
    <div className="flex flex-col gap-4 mt-10 mx-4">
      <div className="flex flex-col bg-gray-50 border-2 border-gray-50">
        <div className="flex items-center gap-4 p-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm font-normal">
              If you have any questions or concerns, please feel free to contact
              us.
            </p>
          </div>
        </div>
        <div className="flex flex-col p-4 bg-white">
          <div className="flex items-center gap-4">
            <Phone size={24} />
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-sm font-normal">+1 234 567 890</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Mail size={24} />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-sm font-normal"> support@codex.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-50 border-2 border-gray-50">
        {/* Show total for items */}
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-md font-bold">
            {currency} {(totalPrice / rate).toFixed(2)}
          </p>
        </div>
        {step < 3 ? (
          <Button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              }
            }}
            className="bg-primary text-white w-full py-2"
          >
            Continue
          </Button>
        ) : (
          <Button
            onClick={purchaseCartItems}
            className="bg-primary text-white w-full py-2"
          >
            Purchase Items
          </Button>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
