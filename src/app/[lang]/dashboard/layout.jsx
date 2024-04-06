import { getUserDetails } from "@/lib/helpers";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import Sidebar from "@/components/dashboard/Sidebar";

const Navbar = dynamic(() => import("@/components/shared/Navbar"));

export default async function DashboardLayout({ children, params: { lang } }) {
  const { data } = await getUserDetails();
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Navbar userDetails={data} t={dictionary} lang={lang || "cz"} />
      <div className="flex flex-row w-full">
        <Sidebar t={dictionary} lang={lang || "cz"} user={data}/>
        {children}
      </div>
    </div>
  );
}
