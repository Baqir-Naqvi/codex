import Navbar from "@/components/shared/Navbar";
import { getUserDetails } from "@/lib";

export default async function DashboardLayout({ children }) {
  const { data } = await getUserDetails();
  return (
    <section>
      <Navbar userDetails={data[0]} />
      {children}
    </section>
  );
}
