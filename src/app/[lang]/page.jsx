import React from "react";
import { listPaginatedProducts } from "@/lib/helpers";
import { getDictionary } from "@/lang/dictionaries";
import ProductsContainer from "@/components/shared/ProductsContainer";
import LanguageDropdown from "@/components/auth/LanguageDropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Home/Hero";

async function page({ params, searchParams }) {
  const { lang } = params;
  const { data, count } = await listPaginatedProducts(1, 20);
  const dictionary = await getDictionary(lang);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-violet-100">
      <header className="flex justify-between px-5 py-2 justify-center flex-row items-center">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-x-3">
          <LanguageDropdown redirect={"/"} />
          <Button label={dictionary.auth.login} href={`/${lang}/auth/login`}>
            <Link href={`/${lang}/auth/login`}>{dictionary.auth.login}</Link>
          </Button>
          <Button label={dictionary.auth.register}>
            <Link href={`/${lang}/auth/register`}>
              {dictionary.auth.registerButton}
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-col items-center items-center w-full justify-center bg-gradient-to-r from-blue-200 to-violet-100 py-10">
        <Hero t={dictionary} />

        <ProductsContainer products={data} count={count} disable={true} t={dictionary}/>
      </div>
    </div>
  );
}

export default page;
