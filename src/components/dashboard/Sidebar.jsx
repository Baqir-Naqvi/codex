"use client";
import React from "react";
import { useLayoutStore } from "@/store/layoutStore";
import {
  Home,
  History,
  PackageSearch,
  ArrowRightLeft,
  Store,
  MoveRight,
} from "lucide-react";
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
function Sidebar({ t, lang,user }) {
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
          {user.isVerified && (
            <>
              {" "}
              <NavItem
                title={t.sidebar.sell}
                icon={<PackageSearch size={20} />}
                href={`/${lang}/dashboard/sell`}
              />
              <NavItem
                title={t.sidebar.trade}
                icon={<ArrowRightLeft size={20} />}
                href={`/${lang}/dashboard/trade`}
              />
              <NavItem
                title={t.sidebar.transfer}
                icon={<MoveRight size={20} />}
                href={`/${lang}/dashboard/secure-transfer`}
              />
              <NavItem
                title={t.sidebar.marketplace}
                icon={<Store size={20} />}
                href={`/${lang}/dashboard/marketplace`}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
