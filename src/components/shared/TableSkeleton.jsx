import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const TableSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-20 mb-5" />
      <Skeleton className="w-full h-10 my-2" />
      <Skeleton className="w-full h-10 my-2" />
      <Skeleton className="w-full h-10 my-2" />
    </div>
  );
};


export default TableSkeleton