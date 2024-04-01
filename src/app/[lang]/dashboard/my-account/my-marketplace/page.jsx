import { getUserMarketPlace } from "@/lib/helpers";
import React from "react";
import MyMarketPlaceContainer from "@/components/dashboard/my-marketplace/index";
import { getDictionary } from "@/lang/dictionaries";

async function page({ params: { lang } }) {
  const { data, status } = await getUserMarketPlace();
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col w-full ">
      <h1 className="text-2xl font-semibold text-gray-700">
        {dictionary.myaccount.mymarketplace.title}
      </h1>
      <p className="text-xl text-gray-500">
        {dictionary.myaccount.mymarketplace.heading1} {data.length}{" "}
        {dictionary.myaccount.mymarketplace.heading2}
      </p>
      <div className="container mx-auto">
        <MyMarketPlaceContainer
          products={JSON.parse(JSON.stringify(data))}
          t={dictionary}
        />
      </div>
    </div>
  );
}

export default page;
