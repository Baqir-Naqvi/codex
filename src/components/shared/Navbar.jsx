"use client"
import { useState,useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, CircleUser } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {useRouter} from "next/navigation"
import {useUserStore} from "@/store/userStore"

import LanguageDropdown from "@/components/shared/LanguageDropdown"
function Navbar({ userDetails, isAdmin, t ,lang}) {
  const router = useRouter();

  useEffect(() => {
    useUserStore.setState({ user: userDetails, authReady: true });
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
          router.push(`/${lang}/auth/login`);
        }
      });
  };

  return (
    <div
      className={`header h-16 flex-row py-5  text-white flex items-center justify-between px-4 z-100 
    ${
      isAdmin ? "bg-white" : "bg-white border-b-[1px] border-gray-300 shadow-md"
    }
    `}
    >
      <div className="flex items-center justify-center">
        <a href={`/${lang}/dashboard`}>
          <Image
            src="/images/logo.png"
            alt="Picture of the author"
            width={50}
            height={50}
            className="hover:cursor-pointer"
          />
        </a>
      </div>
      {isAdmin && (
        <div className="flex items-center">
          <p className="text-xl text-black">{t.admin.title}</p>
        </div>
      )}
      <div className="flex items-center justify-center gap-x-3">
        <LanguageDropdown />

        <Menubar>
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
      </div>
    </div>
  );
}

export default Navbar;
