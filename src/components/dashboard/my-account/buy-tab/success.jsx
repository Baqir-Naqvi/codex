import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays  } from "lucide-react";

function SuccessMessage({t}) {
  return (
    <div className="flex flex-col md:w-[450px] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{t.myaccount.success.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 items-center"></div>

          <CardDescription>{t.myaccount.success.msg}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 items-center">
          {/* show current date and due date will be 3 days from now on*/}
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <p className="text-sm flex gap-x-2">
                <CalendarDays size={16} />
                {t.myaccount.success.currentDate}
              </p>
              <p className="text-sm">{new Date().toDateString()}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm flex gap-x-2">
                <CalendarDays size={16} />
                {t.myaccount.success.dueDate}
              </p>
              <p className="text-sm">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString()}
              </p>
            </div>
          </div>
          <Button>{t.continue}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SuccessMessage