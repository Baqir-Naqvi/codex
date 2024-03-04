import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { getDictionary } from "@/lang/dictionaries";
import Image  from "next/image";


async function LanguageDropdown({ redirect }) {
  const t = await getDictionary("en");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Globe />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t.language.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href={"/en" + redirect}
           className="my-2 flex flex-row gap-1">
            <Image src="/images/us.png" width={20} height={20} alt="English" />
            English (EN)
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="my-2">
          <a href={"/cz" + redirect}
          className="my-2 flex flex-row gap-1">
            <Image src="/images/cz.png" width={20} height={20} alt="Czech" />
            Czech (CZ)
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageDropdown