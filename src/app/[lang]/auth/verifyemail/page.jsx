import React from 'react'
import SetPassword from '@/components/auth/SetPassword'
import Loader from '@/components/shared/Loader';


async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/verifyemail?token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
        console.log(data);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
    }, 1000);
  }
  );
}


async function page({ searchParams }) {
    const token = searchParams.token;
    if (!token) {
        return <div>Missing Token</div>;
    }
    const data = await verifyToken(token);
    console.log("data", data);
    let email = data.body;

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