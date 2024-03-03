import React from 'react'
import SetPassword from '@/components/auth/SetPassword'


async function page({ searchParams }) {
    const token = searchParams.token;
    if (!token) {
        return <div>Vaildation failed</div>;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/verifyemail?token=${token}`
    );
    const data = await res.json();
    let email=data.body
  return (
    <div
      className="flex flex-col items-center justify-center h-screen
    bg-cover bg-center bg-no-repeat bg-hero-pattern"
    >
      {data.status === 200 ?
      <SetPassword email={email} token={token} />
      : <div>Verification failed</div>}

    </div>
  );
}

export default page