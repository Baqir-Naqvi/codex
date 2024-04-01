import { getUserDetails } from "@/lib";
import { getDictionary } from "@/lang/dictionaries";
import Loader from "@/components/shared/Loader";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/shared/Navbar"), {
  ssr: false,
  loading: () => <Loader />,
});

const Sidebar = dynamic(() => import("@/components/admin/Sidebar"), {
  ssr: false,
});

export default async function AdminLayout({ children, params: { lang } }) {
  const { data } = await getUserDetails();
  const dictionary = await getDictionary(lang);
  return (
    <section>
      <Navbar
        userDetails={data[0]}
        isAdmin={true}
        t={dictionary}
        lang={lang || "cz"}
      />
      <section className="flex flex-row">
      <Sidebar t={dictionary} lang={lang || "cz"} />
      {children}
      </section>
    </section>
  );
}
