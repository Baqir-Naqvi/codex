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
import { ChevronDown } from "lucide-react";
import { useConversionStore } from "@/store/conversionStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTradeStore } from "@/store/useTrade";
import { useUserStore } from "@/store/userStore";

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
function Sidebar({ t, lang, user }) {
  const sidebartoggle = useLayoutStore((state) => state.sidebartoggle);
  const setSidebarToggle = useLayoutStore((state) => state.setSidebarToggle);
  const [loading, setLoading] = useState(true);

  const { setWeight, weightLabel, setWeightLabel } = useConversionStore();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      className={`flex flex-col
     transition-all duration-500 ease-in-out overflow-hidden
     ${sidebartoggle ? "md:w-96 w-0" : "w-24"} `}
    >
      <div className="py-4">
        <ul>
          <NavItem
            title={t.sidebar.dashboard}
            icon={<Home size={20} />}
            href={`/${lang}/dashboard`}
          />
          <NavItem
            title={t.sidebar.myorders}
            icon={<History size={20} />}
            href={`/${lang}/dashboard/e-orders`}
          />
          {user.isVerified && (
            <>
              {" "}
              <NavItem
                title={t.sidebar.sales}
                icon={<PackageSearch size={20} />}
                href={`/${lang}/dashboard/my-account/my-sales`}
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

        <div className="mt-4">
          {/* Weight options to render in grams kg or ounce */}
          {!loading && (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[250px]">
                <div className="flex items-center py-4 px-6 cursor-pointer">
                  <span className="mr-4">
                    <ChevronDown size={20} />
                  </span>
                  <span>{weightLabel}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setWeightLabel("g");
                    setWeight(1);
                  }}
                  className="py-2 px-4"
                >
                  {t.sidebar.gram}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setWeightLabel("kg");
                    setWeight(1000);
                  }}
                  className="py-2 px-4"
                >
                  {t.sidebar.kilogram}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setWeight(31.11);
                    setWeightLabel("oz");
                  }}
                  className="py-2 px-4"
                >
                  {t.sidebar.ounce}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
