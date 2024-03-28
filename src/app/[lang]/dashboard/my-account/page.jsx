import React from 'react'
import dynamic from 'next/dynamic'
import { getDictionary } from "@/lang/dictionaries";
const UserDetails = dynamic(() => import('@/components/dashboard/my-account/user-details'))
const AccountTabs = dynamic(() => import('@/components/dashboard/my-account/account-tabs'))

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <UserDetails t={dictionary}/>
      <AccountTabs t={dictionary}/>
    </div>
  );
}

export default page