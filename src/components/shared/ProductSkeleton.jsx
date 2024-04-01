import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full md:w-[350px] md:h-[450px] ">
      <Skeleton className="w-[350px] border-[1px] border-slate-300 md:h-[250px]" />
      <Skeleton className="w-[350px] border-[1px] border-slate-300 md:h-[100px]" />
      <div className="flex flex-row gap-2 justify-between items-center">
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[40px] h-[20px]" />
      </div>

      <div className="flex flex-row w-full justify-end items-right">
        <Skeleton className="w-[140px] h-[40px]" />
      </div>
    </div>
  );
}

export default ProductSkeleton;
