import React from 'react'
import LoginFrom from '@/components/auth/LoginForm'
import { getDictionary } from "@/lang/dictionaries";
import LanguageDropdown from "@/components/shared/LanguageDropdown";

async function Login({ params: { lang } }) {
  const dictionary =await getDictionary(lang);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-hero-pattern">
      <header className="absolute top-5 right-5">
        <LanguageDropdown redirect={"/auth/login"} />
      </header>
      <LoginFrom t={dictionary} lang={!lang ? "en" : lang} />
    </div>
  );
}

export default Login