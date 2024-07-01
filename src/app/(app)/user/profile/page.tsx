"use client";
import React, { useEffect, useState } from "react";
import { UserType } from "@/types/userType";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function Dashboard() {
  const [userData, setUserData] = useState<UserType>();
  useEffect(() => {
    setUserData(JSON.parse(Cookies.get("userData") as string));
    console.log(userData);
  }, []);
  console.log(userData);
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card>
        <CardContent>
          <CardHeader className="">
            <CardTitle className="py-2">User Profile</CardTitle>
            <CardDescription className="py-2">
              This is some information about user
            </CardDescription>
            <Separator />
            <div className="flex items-center gap-x-5 p-3 justify-between">
              <CardDescription>Full name</CardDescription>
              <p>{userData?.name}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-x-5 p-3 justify-between">
              <CardDescription>Email address</CardDescription>
              <p>{userData?.email}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-x-5 p-3 justify-between">
              <CardDescription>User role</CardDescription>
              <p>Job {userData?.role}</p>
            </div>
            <Separator />
            {userData?.role == "worker" ? (
              <>
                <div className="flex items-center gap-x-5 p-3 justify-between">
                  <CardDescription>Experience</CardDescription>
                  <p>{userData?.experience} years</p>
                </div>
                <Separator />
                <div className="flex items-center gap-x-5 p-3 justify-between">
                  <CardDescription>Skills</CardDescription>
                  <p>{userData?.skills}</p>
                </div>
                <Separator />
              </>
            ) : (
              <></>
            )}
            <div className='flex items-center gap-x-5 p-3 justify-between'>
                            <CardDescription>WalletAddress</CardDescription>
                            <p>{userData?.walletAddress}</p>
                        </div>
                        <Separator/>
                        <div className='flex items-center  gap-x-5 p-3 justify-between'>
                            <CardDescription className="">Registered on</CardDescription>
                            <p>{dayjs(userData?.createdAt).format("MMM D, YYYY h:mm A")}</p>
                        </div>
                        <Separator/>
          </CardHeader>
        </CardContent>
      </Card>
    </main>
  );
}
