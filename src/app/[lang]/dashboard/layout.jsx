import { getUserDetails } from "@/lib";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import pageLoader from "@/components/shared/pageLoader";
import Sidebar from "@/components/dashboard/Sidebar";
import Loader from "@/components/shared/Loader";

const Navbar = dynamic(() => import("@/components/shared/Navbar"));

export default async function DashboardLayout({ children, params: { lang } }) {
  const { data } = await getUserDetails();
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Navbar userDetails={data[0]} t={dictionary} lang={lang || "cz"} />
      <div className="flex flex-row w-full">
        <Sidebar t={dictionary} lang={lang || "cz"} user={data[0]}/>
        {children}
      </div>
    </div>
  );
}
