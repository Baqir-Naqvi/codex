import React from "react";
import RegisterForm from "@/components/auth/registration/RegisterForm";
import Image from "next/image";
import LanguageDropdown from "@/components/shared/LanguageDropdown";


function page() {
  return (
    <div className="flex md:flex-row flex-col  items-center justify-between h-screen">
      <header className="absolute top-5 right-5">
        <LanguageDropdown redirect={"/auth/register"} />
      </header>
      <div className="md:flex hidden md:w-1/2 flex-col py-5 h-full items-center justify-between bg-gradient-to-r from-blue-400 to-violet-400">
        <Image src="/images/logo.png" alt="logo" width={200} height={200} />
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-white">Welcome to Codex</h1>

          <p className="text-white">
            A place to share knowledge and better understand the world
          </p>
        </div>

        <p className="text-white text-center">
          All rights reserved. Codex 2024
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}

export default page;
