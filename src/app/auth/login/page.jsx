import React from 'react'
import LoginFrom from '@/components/auth/LoginForm'
import { getDictionary } from "@/lang/dictionaries";
function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-hero-pattern">
      
      <LoginFrom />
    </div>
  );
}

export default Login