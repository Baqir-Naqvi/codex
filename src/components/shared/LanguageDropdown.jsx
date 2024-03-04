"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

async function LanguageDropdown() {
  const router = useRouter();

  const handleLanuageChange = (lang) => {
        const currentURL=window.location.pathname
        // console.log(currentURL)
        const newURL=currentURL.replace(/^\/[a-z]{2}/, `/${lang}`)
        router.push(newURL)
        
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Globe color="black"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="my-2 flex flex-row gap-1"
          onClick={() => handleLanuageChange("en")}
        >
          <Image src="/images/us.png" width={20} height={20} alt="English" />
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
  );
}

export default LanguageDropdown;
