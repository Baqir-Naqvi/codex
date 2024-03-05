import React from "react";
// import SetPassword from "@/components/auth/SetPassword";
import { verfiyToken } from "@/lib/helpers";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";
const SetPassword = dynamic(() => import("@/components/auth/SetPassword"), {
  loading: () => <Loader />,
  ssr: false,
});


async function page({ searchParams }) {
  const token = searchParams.token;
  if (!token) {
    return <div>Vaildation failed</div>;
  }
  const data = await verfiyToken(token);
  const email = data.body;
  return (
    <div
      className="flex flex-col items-center justify-center h-screen
    bg-cover bg-center bg-no-repeat bg-hero-pattern"
    >
      {data.status === 200 ? (
        <SetPassword email={email} token={token} />
      ) : (
        <div>Verification failed</div>
      )}
    </div>
  );
}

export default page;
