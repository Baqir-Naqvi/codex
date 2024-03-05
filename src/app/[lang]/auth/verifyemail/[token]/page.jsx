import React from "react";
// import SetPassword from '@/components/auth/SetPassword'
import dynamic from "next/dynamic";
import Loader from "@/components/shared/Loader";
const SetPassword = dynamic(() => import("@/components/auth/SetPassword"), {
  loading: () => <Loader />,
  ssr: false,
});

async function page({ params }) {
  const token = params.token;
  console.log("Token", token);
  if (!token) {
    return <div>Vaildation failed</div>;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/verifyemail?token=${token}`,{
      cache: "no-cache",
    }
  );
  const data = await res.json();
  let email = data.body;
  console.log(data);
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
