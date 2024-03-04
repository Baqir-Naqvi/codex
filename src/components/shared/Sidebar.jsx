"use client";
import React from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { Home, Users, PackageSearch } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
const NavItem = ({ title, icon, href }) => {
  return (
    <Link
      className="flex items-center py-4 px-6 hover:bg-gray-100 cursor-pointer"
      href={href}
    >
      <span className="mr-4">{icon}</span>
      <span>{title}</span>
    </Link>
  );
};
function Sidebar({ t, lang }) {
  const sidebartoggle = useLayoutStore((state) => state.sidebartoggle);
  const setSidebarToggle = useLayoutStore((state) => state.setSidebarToggle);

  return (
    <div
      className={`w-64 h-screen fixed top-20 left-0 z-50 border-r-[1px] border-gray-300
    transition-transform duration-300 ease-in-out bg-[#f7f7f7]
     ${sidebartoggle ? "translate-x-0" : "-translate-x-[90%]"} `}
    >
      <div className="absolute -top-4 -right-5 p-2 bg-black cursor-pointer rounded-full">
        <ChevronRight
          size={24}
          color="white"
          className={`cursor-pointer ${
            sidebartoggle ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setSidebarToggle(!sidebartoggle)}
        />
      </div>
      <div className="py-4">
        <ul>
          <NavItem title={t.sidebar.dashboard}
          icon={<Home size={20} />} href={`/${lang}/admin`} />
          <NavItem
            title={t.sidebar.users}
            icon={<Users size={20} />}
            href={`/${lang}/admin/users`}
          />
          <NavItem
            title={t.sidebar.products}
            icon={<PackageSearch size={20} />}
            href={`/${lang}/admin/products`}
          />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
