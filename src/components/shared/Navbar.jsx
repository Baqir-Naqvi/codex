"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, CircleUser, ShoppingCart } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useConversionStore } from "@/store/conversionStore";
import Cart from "@/components/dashboard/cart";

function Navbar({ userDetails, isAdmin, t, lang }) {
  const router = useRouter();
  const { flag, setConversionRates, conversionRates } = useConversionStore();

  const Currencies = [
    { name: "USD", flag: "/images/usd.png" },
    { name: "CZK", flag: "/images/kz.png" },
    { name: "PLN", flag: "/images/pol.png" },
    { name: "EUR", flag: "/images/eu.png" },
    { name: "GBP", flag: "/images/GBP.png" },
  ];

  const handleLanuageChange = (lang) => {
    const currentURL = window.location.pathname;
    // console.log(currentURL)
    const newURL = currentURL.replace(/^\/[a-z]{2}/, `/${lang}`);
    router.push(newURL);
  };
  useEffect(() => {
    useUserStore.setState({ user: userDetails, authReady: true });
    fetch(`/api/exchange?currency=all`).then((res) => res.json()).then((data) => {
      setConversionRates(data.data);
    });
  }, []);

  const handleLogout = () => {
    fetch("/api/auth/login", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          router.push(`/${lang}`);
        }
      });
  };

  const handleCurrencyChange = (currency, flag) => {
   //find the currency in the conversionRates array 
    const currencyIndex = conversionRates.findIndex((rate) => rate.currency === currency);
    useConversionStore.setState({
      currency: conversionRates[currencyIndex]?.currency,
      rate: parseFloat(conversionRates[currencyIndex]?.rate),
      flag: flag,
    });
  };

  return (
    <div
      className={`header h-16 flex-row py-5  text-white flex items-center justify-between px-4 z-100 
    ${isAdmin ? "bg-white" : "bg-white "}
    `}
    >
      <div className="flex items-center justify-center">
        <a href={`/${lang}/dashboard`}>
          <img
            src="/images/logo.png"
            alt="Picture of the author"
            width={50}
            height={50}
            className="hover:cursor-pointer"
          />
        </a>
        <p className="text-xl font-semibold text-black">Codex</p>
      </div>
      {isAdmin && (
        <div className="flex items-center">
          <p className="text-xl text-black">{t.admin.title}</p>
        </div>
      )}
      <div className="flex items-center justify-center gap-x-3">
        {/* CurrencyDropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:cursor-pointer text-black flex gap-x-2">
            <img src={flag} width={18} height={18} alt="CZK" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel> Currency</DropdownMenuLabel>
            {Currencies.map((currency, index) => (
              <DropdownMenuItem
                className="my-2 flex flex-row gap-1"
                key={index}
                onClick={() =>
                  handleCurrencyChange(currency.name, currency.flag)
                }
              >
                <Image
                  src={currency.flag}
                  width={20}
                  height={20}
                  alt={currency.name}
                />
                {currency.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <LanguageDropdown /> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Globe color="black" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="my-2 flex flex-row gap-1"
              onClick={() => handleLanuageChange("en")}
            >
              <Image
                src="/images/us.png"
                width={20}
                height={20}
                alt="English"
              />
              English (EN)
            </DropdownMenuItem>
            <DropdownMenuItem
              className="my-2 flex flex-row gap-1"
              onClick={() => handleLanuageChange("cz")}
            >
              <Image src="/images/cz.png" width={20} height={20} alt="Czech" />
              Czech (CZ)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Menubar className="border-none">
          <MenubarMenu className="border-none hover:cursor-pointer">
            <MenubarTrigger>
              <CircleUser color="black" className="hover:cursor-pointer" />
            </MenubarTrigger>
            <MenubarContent className="mt-1">
              <MenubarItem className="flex flex-col w-full justify-center items-start">
                <span className="text-md font-bold">
                  {userDetails.firstName}
                </span>
                {userDetails.email}
              </MenubarItem>
              <MenubarItem>
                <span className="text-md font-bold mr-1">ID </span>
                {userDetails.uniqueCode}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Link href="/dashboard/settings">{t.dropdown.settings}</Link>
              </MenubarItem>
              {userDetails.role == "admin" && (
                <MenubarItem>
                  <a href={`/${lang}/admin`}>{t.dropdown.admin}</a>
                </MenubarItem>
              )}

              <MenubarItem>{t.dropdown.viewProfile}</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleLogout}>
                {t.dropdown.logout}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Cart />
      </div>
    </div>
  );
}

export default Navbar;
