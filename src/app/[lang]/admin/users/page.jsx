import { columns } from "@/components/admin/UsersTable/columns";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";
const UsersTable = dynamic(() => import("@/components/admin/UsersTable"), {
  ssr: false,
  loading: () => <Loader />,
});

export default async function AdminPage({params}) {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/admin/users`,
    { cache: "no-store" },
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return (
    <div className="flex flex-col items-center  h-screen bg-[#f7f7f7]">
      <div className="flex justify-center w-full mt-10">
        <UsersTable columns={columns} data={data} />
      </div>
    </div>
  );
}
