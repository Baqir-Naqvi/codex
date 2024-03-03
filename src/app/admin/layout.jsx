import Navbar from '@/components/shared/Navbar'
import {getUserDetails} from "@/lib"
import Sidebar from '@/components/shared/Sidebar';

export default async function DashboardLayout({
  children,
}) {
    const {data }=await getUserDetails()
  return (
    <section>

      <Navbar userDetails={data[0]} isAdmin={true}/>
      <Sidebar />
      {children}
    </section>
  );
}