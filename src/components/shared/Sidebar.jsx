"use client";
import React from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { Home, Users, PackageSearch } from "lucide-react";
import Link from "next/link";

const NavItem = ({ title, icon,href }) => {
    return (
      <Link className="flex items-center py-4 px-6 hover:bg-gray-100 cursor-pointer" href={href}>
        <span className="mr-4">{icon}</span>
        <span>{title}</span>
      </Link>
    );
    };
function Sidebar() {
  const sidebartoggle = useLayoutStore((state) => state.sidebartoggle);
  return (
    <div
      className={`w-64 bg-white h-screen fixed top-16 left-0 z-50
    transition-transform duration-300 ease-in-out
     ${sidebartoggle ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="py-4">
        <ul>
          <NavItem title="Dashboard" icon={<Home size={20} />} href="/admin" />
          <NavItem title="Users" icon={<Users size={20} />} href="/admin/users" />
          <NavItem title="Products" icon={<PackageSearch size={20} />} href="/admin/products" />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
