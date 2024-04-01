"use client"
import React from 'react'
import AdminAccountSales from "@/components/admin/UsersTable";
import { columns } from "@/components/admin/sales/account/account-column";
import {useState, useEffect} from 'react'
import TableSkeleton from "@/components/shared/TableSkeleton";

function index() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => { 
        fetch("/api/admin/sales")
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
  return <div className="flex flex-col w-full">
    {loading ? 
    (
    <TableSkeleton />
    ):(
    <AdminAccountSales
      data={data}
      columns={columns}
    />
    )}
  </div>;
}

export default index