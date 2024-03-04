import { getUserDetails } from "@/lib";
import dynamic from "next/dynamic";
import { getDictionary } from "@/lang/dictionaries";
import pageLoader from "@/components/shared/pageLoader";



const Navbar = dynamic(() => import("@/components/shared/Navbar"), {
  loading: pageLoader,
  ssr: false,

});



export default async function DashboardLayout({ children, params: { lang } }) {
  const { data } = await getUserDetails();
  const dictionary = await getDictionary(lang);

  return (
    <section>
      <Navbar userDetails={data[0]} t={dictionary} lang={lang || "cz"} />
      {children}
    </section>
  );
}
