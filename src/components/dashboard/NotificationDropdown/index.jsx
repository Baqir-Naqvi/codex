import React from "react";
import { Bell } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState, useEffect } from "react";

function NotificationDropDown({ userID }) {
  const [notifications, setNotifications] = useState([]);
  const [transferRequests, setTransferRequests] = useState(0);

  useEffect(() => {
    fetch(`/api/user/transfer?receiverID=${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setTransferRequests(data.data.length);
        setNotifications(data.data);
      });
  }, []);
  return (
    <div>
      <Menubar className="border-none">
        <MenubarMenu className="border-none hover:cursor-pointer">
          <MenubarTrigger>
            <Bell color="black" className="hover:cursor-pointer" />
          </MenubarTrigger>
          <MenubarContent className="mt-1 w-[300px] h-[400px] overflow-y-auto mr-10">
            <MenubarItem className="flex flex-col w-full justify-center items-start">
              {transferRequests > 0 && (
                <span className="text-md font-bold">
                  You have {transferRequests} transfer requests
                </span>
              )}
              {transferRequests == 0 && (
                <span className="text-md font-bold">No transfer requests</span>
              )}
            </MenubarItem>
            <MenubarSeparator />
            {notifications.map((notification) => (
              <>
                <MenubarItem className="flex flex-col w-full justify-center items-start ">
                  <div className="flex flex-row justify-between w-full">
                    <span className="text-[14px]">{notification.name}</span>
                    <span className="text-[14px] font-bold">
                      {notification.transferWeight} g
                    </span>
                  </div>
                  <span className="text-[14px]">
                    <span className="font-bold">Transfer Date: </span>
                    {notification.transferDate.split("T")[0]}
                  </span>

                  <span className="text-[14px]">
                    <span className="font-bold">Offer Price: </span>
                    {notification.offerPrice.toFixed(2)} CZK</span>
                  <span className="text-[14px]">
                    <span className="font-bold">Offer by: </span>
                    {notification.transferFrom}
                  </span>
                  <span className="text-[14px]">
                    <span className="font-bold">Status: </span>
                    {notification.transferStatus}
                  </span>
                </MenubarItem>
                <MenubarSeparator />
              </>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <span className=" text-[12px] bg-black text-white rounded-full w-5 h-5 flex items-center justify-center absolute top-3 -mr-2 ">
        {transferRequests}
      </span>
    </div>
  );
}

export default NotificationDropDown;
