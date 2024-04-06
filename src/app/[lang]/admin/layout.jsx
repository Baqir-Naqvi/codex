import { getUserDetails } from "@/lib/helpers";
import { getDictionary } from "@/lang/dictionaries";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/shared/Navbar";
export default async function AdminLayout({ children, params: { lang } }) {
  const { data } = await getUserDetails();
  const dictionary = await getDictionary(lang);
  return (
    <>
      <Navbar
        userDetails={data}
        isAdmin={true}
        t={dictionary}
        lang={lang || "cz"}
      />
      <section className="flex flex-row">
      <Sidebar t={dictionary} lang={lang || "cz"} />
      {children}
      </section>
    </>
  );
}
