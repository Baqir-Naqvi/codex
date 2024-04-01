"use client";
import React from "react";
import UsersAccountPurchases from "@/components/admin/UsersTable";
import { columns } from "@/components/admin/purchases/account/account-column";
import { useState, useEffect } from "react";
import TableSkeleton from "@/components/shared/TableSkeleton";


function index() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //isEshop is false to get Account Purchases
    fetch("/api/admin/purchases?isEshop=false")
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <UsersAccountPurchases data={purchases} columns={columns} title={'Account Purchases'}/>
      )}
    </div>
  );
}

export default index;
