"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TransferTerms from "@/components/dashboard/transfer/transfer-terms";

function TransferRequests({ userId, t, lang }) {
  const [notifications, setNotifications] = useState([]);
  const [transferRequests, setTransferRequests] = useState(0);

  useEffect(() => {
    fetch(`/api/user/transfer?receiverID=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTransferRequests(data.data.length);
        setNotifications(data.data);
      });
  }, []);
  return (
    <div className="flex flex-col w-[90%] mx-auto gap-y-4">
      <h2 className="text-xl font-bold my-4">
        {t.securetransfer.transferRequests}
      </h2>

      {notifications.map((notification,index) => (
        //alert component for each transfer request
        <Alert key={index} className="bg-white border-[1px] border-gray-400 ">
          <AlertTitle>{notification.name}</AlertTitle>
          <AlertDescription>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold">
                  {notification.transferWeight} g
                </span>
                <span className="text-[14px]">
                  <span className="font-bold">Transfer Date: </span>
                  {notification.transferDate.split("T")[0]}
                </span>
                <span className="text-[14px]">
                  <span className="font-bold">Offer Price: </span>
                  {notification.offerPrice}
                </span>
              </div>
              <div className="flex flex-row gap-x-2">
                <TransferTerms />
                <Button className="bg-white text-black border-[1px] border-black hover:bg-black hover:text-white">
                  Reject
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

export default TransferRequests;
