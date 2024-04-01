import React from 'react'
import dynamic from 'next/dynamic'
import { getDictionary } from "@/lang/dictionaries";
import { getUserid } from "@/lib"

const UserDetails = dynamic(() => import('@/components/dashboard/my-account/user-details'))
const AccountTabs = dynamic(() => import('@/components/dashboard/my-account/account-tabs'))

async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const userID = await getUserid();
  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <UserDetails t={dictionary} userID={userID}/>
      <AccountTabs t={dictionary}/>
    </div>
  );
}

export default page