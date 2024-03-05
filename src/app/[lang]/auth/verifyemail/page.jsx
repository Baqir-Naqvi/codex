import React from 'react'
import SetPassword from '@/components/auth/SetPassword'

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/verifyemail?token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
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
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/verifyemail?token=${token}`
    // );
    // const data = await res.json();
    // let email=data.body
    // console.log(data)
    const data = await verifyToken(token);
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