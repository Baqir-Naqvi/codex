"use client"
import React from 'react'
import AdminMarketPlaceSales from "@/components/admin/UsersTable";
import { columns } from "@/components/admin/sales/eshop/eshop-column";
import {useState, useEffect} from 'react'
import TableSkeleton from "@/components/shared/TableSkeleton";


function index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => { 
        fetch("/api/admin/sales?isEshop=true") //get products which are listed on marketplace (isEshop=true)
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <TableSkeleton />
      ) : (
        <AdminMarketPlaceSales data={data} columns={columns} />
      )}
    </div>
  );
}

export default index