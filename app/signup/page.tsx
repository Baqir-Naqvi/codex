// /app/signup/page.tsx

// @ts-nocheck
// @ts-ignore
/** @jsxImportSource theme-ui */

// Mark the parent component as a client component
'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import SignUpForm from '@/app/ui/signup-form';
import mascout from '@/public/logo/mascot2.png'
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <main className="flex justify-between h-screen">
      <div className='basis-1/2'>
        <div className='flex flex-col justify-between h-screen'>
        <p className='text-3xl font-bold mt-[75px] ml-[39px]'>signstory</p>
        <p className='ml-[39px] text-6xl max-w-[616px]'>Welcome to <span className='text-[#389FCF] font-bold'>signstory</span>, where stories come to life!</p>
        <Image className='self-center' src={mascout} alt='signstory-logo'/>
        </div>
 
      </div>
      <div className='bg-[#CBE7F4] pt-[87px] pl-[43px] basis-1/2 mt-[75px] rounded-l-xl'>
        
        <p className='text-4xl font-extrabold'>Create Account</p>
        <SignUpForm />
      </div>
        
    </main>
  );
}



