"use client";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/dashboard/ProductDetails/Loader";
import { useConversionStore } from "@/store/conversionStore";

const ProductDetail = ({ product_id }) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState({});
  const [disable, setDisable] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { currency, rate, weight, weightLabel } = useConversionStore();
  const activeUser = useUserStore((state) => state.user);
  const authReady = useUserStore((state) => state.authReady);

  useEffect(() => {
    fetch("/api/product?id=" + product_id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if(!authReady) return;
    if (activeUser.limitAccess && product.price > 10000) {
      setDisable(true);
    }
  }, [activeUser, product]);

  const handlePurchase = () => {
    fetch("/api/product/purchase?product_id=" + product._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: activeUser._id,
        quantity: quantity,
        originalPrice: product.price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast({
          title: "Product Purchased",
          description: "Product has been purchased",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to Purchase Product",
          description: error.message,
          variant: "destructive",
        });
        console.log(error);
      });
  };

  const handleAddtoCart = () => {
    fetch("/api/user/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: activeUser._id,
        product_id: product._id,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          // useUserStore.setState( (state) => ({ user: {...state.user, cart: [...state.user.cart, product] } }))
          //if item with same id is already in cart, update the quantity
          useUserStore.setState((state) => {
            let cart = state.user.cart;
            let index = cart.findIndex((item) => item._id === product._id);
            if (index !== -1) {
              cart[index].quantity += quantity;
            } else {
              cart.push({ ...product, quantity: quantity });
            }
            return { user: { ...state.user, cart: cart } };
          });

          toast({
            title: "Product Added to Cart",
            description: "Product has been added to cart",
          });
        } else {
          toast({
            title: "Failed to Add Product to Cart",
            description: data.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Failed to Add Product to Cart",
          description: error.message,
          variant: "destructive",
        });
        console.log(error);
      });
  };

  return (
    <>
      {!loading && (
        <div className="container b-none py-5 lg:grid lg:grid-cols-2 lg:py-10">
          {/* image gallery */}
          <div className="container mx-auto px-4 ">
            {/* /image gallery  */}
            <Carousel className="md:w-[550px] h-96 lg:h-auto">
              <CarouselContent>
                {product.photos.map((image, index) => {
                  return (
                    <CarouselItem key={index} className="md:basis-100%">
                      <>
                        {" "}
                        <img
                          src={image}
                          alt="product"
                          className="w-full h-full object-cover"
                        />
                      </>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="flex gap-2 mt-5">
              {product.photos.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="product"
                    className="w-20 h-20 object-cover border border-gray-200 cursor-pointer"
                  />
                );
              })}
            </div>
          </div>
          {/* description  */}

          <div className="mx-auto px-5 lg:px-5">
            <h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.name}</h2>
            <div className="mt-1">
              <div className="flex items-center"></div>
            </div>
            <p className="mt-5 font-bold">
              Availability:{" "}
              {product.isAvailable ? (
                <span className="text-green-600">In Stock </span>
              ) : (
                <span className="text-red-600">Expired</span>
              )}
            </p>
            <p className="font-bold">
              Buy Back Price:{" "}
              <span className="font-normal">{product.buybackPrice}</span>
            </p>

            <p className="font-bold">
              VAT: <span className="font-normal">{product.VAT}</span>
            </p>
            <p className="font-bold">
              Weight: <span className="font-normal">{(product.weight/weight).toFixed(2)} {weightLabel}</span>
            </p>
            <p className="mt-4 text-4xl font-bold ">
              {/* $ */}
              {currency} {(product.price / rate).toFixed(2)}
            </p>
            <p className="pt-5 text-sm leading-5 text-gray-500">
              {product.description}
            </p>

            <div className="mt-6">
              <p className="pb-2 text-xs text-gray-500">Quantity</p>
              <div className="flex">
                <Button
                  className=" h-8 w-8"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  {" "}
                  -
                </Button>
                <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                  {quantity}
                </div>
                <Button
                  className=" h-8 w-8"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  {" "}
                  +
                </Button>
              </div>
            </div>
            <div className="mt-7 flex flex-row items-center gap-6">
              <Button
                className="px-5 py-3 gap-2"
                onClick={handleAddtoCart}
                disabled={disable}
              >
                <ShoppingBag />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
