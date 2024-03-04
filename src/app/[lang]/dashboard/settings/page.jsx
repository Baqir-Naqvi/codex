import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";

const SettingsForm = dynamic(() => import("@/components/auth/registration/SettingsForm"), {
  ssr: false,
  loading: () => <Loader message="Loading Settings" />,
});
export default async function SettingsPage() {


  return (
    <div className="flex flex-col items-center justify-center items-center h-[calc(100vh-4rem)]
     bg-[#f7f7f7]">
      <SettingsForm />
    </div>
  );
}