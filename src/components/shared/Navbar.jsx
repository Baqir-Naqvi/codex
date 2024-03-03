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
import {useLayoutStore} from "@/store/layoutStore"
function Navbar({ userDetails ,isAdmin}) {
  const router = useRouter();
  const sidebartoggle = useLayoutStore((state) => state.sidebartoggle);
  const setSidebarToggle = useLayoutStore((state) => state.setSidebarToggle);
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
    <div
      className={`header h-16 flex-row py-5  text-white flex items-center justify-between px-4 z-100 
    ${
      isAdmin
        ? "bg-[#f7f7f7]"
        : "bg-white border-b-[1px] border-gray-300 shadow-md"
    }
    `}
    >
      <div className="flex items-center justify-center">
        {isAdmin && (
          <Menu
            className="hover:cursor-pointer"
            size={24}
            onClick={() => setSidebarToggle(!sidebartoggle)}
            color="black"
          />
        )}
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={50}
          height={50}
          className="hover:cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>
      {isAdmin && (
        <div className="flex items-center">
          <p className="text-xl text-black">Admin Dashboard</p>
        </div>
      )}

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
            {userDetails.role == "admin" && (
              <MenubarItem>
                <Link href="/admin">Admin</Link>
              </MenubarItem>
            )}

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
