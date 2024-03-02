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
function Navbar({ userDetails }) {
  const router = useRouter();
  useEffect(() => {
    useUserStore.setState({user:userDetails,authReady:true})
  }, [])


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
          router.push("/auth/login");
        }
      });
  };

  return (
    <div className="header h-16 flex-row py-5 bg-white border-b-[1px] border-gray-300 text-white flex items-center justify-between px-4 z-100">
      <Image
        src="/logo.png"
        alt="Picture of the author"
        width={100}
        height={100}
        className="hover:cursor-pointer"
        onClick={() => router.push("/")}
      />
      <Menubar>
        <MenubarMenu className="border-none hover:cursor-pointer">
          <MenubarTrigger>
            <CircleUser color="black" className="hover:cursor-pointer" />
          </MenubarTrigger>
          <MenubarContent className="mt-1">
            <MenubarItem className="flex flex-col w-full justify-center items-start">
              <span className="text-md font-bold">{userDetails.firstName}</span>
              {userDetails.email}
            </MenubarItem>
            <MenubarItem>
              <span className="text-md font-bold mr-1">ID </span>
              {userDetails.uniqueCode}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/settings">Settings</Link>
            </MenubarItem>
            <MenubarItem>View Profile</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Navbar;
