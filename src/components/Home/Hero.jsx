import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
function Hero({t}) {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-900">
            {t.hero.title}
          <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-teal-300">
            {t.hero.subtitle}
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 to-teal-300">
            {t.hero.subtitle2}
          </span>
        </h1>
        <p className="mt-4 text-lg text-blue-800">
            {t.hero.description}
 
        </p>
        <div className="flex justify-center my-10">
          <div className="flex items-center justify-center">
            <Input
              type="text"
              placeholder="Search for products"
              className="w-96 mr-2 h-14 px-4 rounded-lg border-1 border-blue-500 focus:none 
              outline-none text-[18px]
               transition-all duration-300 ease-in-out"
            />
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
