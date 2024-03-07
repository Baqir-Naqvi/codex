"use client";
import React from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { Home, History, PackageSearch } from "lucide-react";
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
      className={`flex flex-col
     transition-all duration-500 ease-in-out overflow-hidden
     ${sidebartoggle ? "w-96" : "w-24"} `}
    >
      <div className="py-4">
        <ul>
          <NavItem
            title={t.sidebar.dashboard}
            icon={<Home size={20} />}
            href={`/${lang}/dashboard`}
          />
          <NavItem
            title={t.sidebar.mypurchases}
            icon={<History size={20} />}
            href={`/${lang}/dashboard/my-purchases`}
          />
          <NavItem
            title={t.sidebar.wishlist}
            icon={<PackageSearch size={20} />}
            href={`/${lang}/dashboard/wishlist`}
          />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
