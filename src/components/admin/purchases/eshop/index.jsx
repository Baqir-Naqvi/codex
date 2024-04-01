"use client"
import React from 'react'
import EshopPurchases from "@/components/admin/UsersTable";
import { columns } from "@/components/admin/purchases/eshop/eshop-column";
import {useState, useEffect} from 'react'
import { Skeleton } from "@/components/ui/skeleton";


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

function index() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //isEshop is true to get EShop/Physical Purchases
    fetch("/api/admin/purchases?isEshop=true")
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <EshopPurchases
          data={purchases}
          columns={columns}
          title={"EShop Purchases"}
        />
      )}
    </div>
  );
}

export default index;
