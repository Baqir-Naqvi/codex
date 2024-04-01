import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

function Loader() {
  return (
    <div className='flex flex-row gap-5 w-full '>
      <Skeleton className='md:w-[500px] border-[1px] border-slate-300 md:h-[550px]' />
      <div className='flex flex-col gap-5'>
        <Skeleton className='w-[300px] h-[30px]' />
        <Skeleton className='w-[300px] h-[30px]' />
        <Skeleton className='w-[300px] h-[30px]' />

        <div className='flex flex-row gap-2 justify-between items-center'>
          <Skeleton className='w-[100px] h-[20px]' />
          <Skeleton className='w-[100px] h-[20px]' />
          <Skeleton className='w-[40px] h-[20px]' />
        </div>

        <div className='flex flex-row w-full justify-end items-right mt-5'>
          <Skeleton className='w-[140px] h-[40px]' />
        </div>
      </div>
    </div>
  );
}

export default Loader