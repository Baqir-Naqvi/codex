import React from 'react'
import mascout from '@/public/logo/mascot.png'
import search from '@/public/icons/Search.png'
import avatar from '@/public/icons/user_female.png'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })


const Navbar = () => {
  return (
    <div className={`${inter.className} border-dashed  border-b-4 border-slate-100 fixed w-full top-0 left-0 bg-white z-50`}>
      <div className=' flex items-center justify-between pt-4 px-4 max-w-[1500px] mx-auto'>
     <Link href={'/dashboard'}>
     <div className='flex items-center cursor-pointer'>
        <Image  src={mascout} alt='signstory-logo'/>
        <p className='text-5xl font-extrabold'>signstory</p>
        </div>
     </Link>
      
        <div className='w-[509px] h-[51px] rounded-3xl bg-[#DCDCDC] flex items-center px-5'>
            <Image src={search} alt='search'/>
            <input type="text" placeholder='find your favorite story...'  className='flex-grow border-none border-transparent focus:border-transparent focus:ring-0 bg-transparent'/>
        </div>
        <div className='flex justify-evenly items-center text-[25px] font-[400px] gap-8 xl:gap-16'>
            <Link href="#">About Us</Link>
            <Link href="#">Learning Dojo</Link>
            <Link href="#">My Shelf</Link>
           <Image src={avatar} alt='avatar'/>
        </div>
      </div>
     
    </div>
  )
}

export default Navbar