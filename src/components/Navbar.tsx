"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { useAppContext } from "@/context/SiteContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { connectWallet } from "@/helpers/connectWallet";
import { X, LogIn, Shield } from "lucide-react";
import { ethers } from "ethers";
import { Loader2, UserRound } from "lucide-react";
import DropDownMenu from "@/components/DropDownMenu";
import { Separator } from "@/components/ui/separator";
import {
  checkUserProviderExist,
  checkUserWorkerExist,
} from "@/helpers/checkUserExist";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { setAccounts, setLogin, accounts, login } = useAppContext();
  const [isActive, setIsActive] = useState<number | null>(null);
  const navLinks = [
    {
      name: "Home",
      link:'/'
    },
    {
      name: "Find work",
      link:'/'
    },
    {
      name: "Applications",
      link:"/"
    },
    {
      name: "Post a job",
      link:"/job"
    },
  ];
  useEffect(() => {
    if(pathname.startsWith('/'))
      setIsActive(0)
    if(pathname.startsWith('/job'))
      setIsActive(3)
    async function handleUserExist() {
      // &&accounts[0]!='0x66d3126465b3d91804bcf0b271b3604db90003e6'
      if (accounts.length > 0) {
        const functionProviderResponse = await checkUserProviderExist(accounts);
        console.log(functionProviderResponse);
        if (functionProviderResponse.success == false) {
          console.log("in worker if");

          const functionWorkerResponse = await checkUserWorkerExist(accounts);
          console.log(functionWorkerResponse);
          if (functionWorkerResponse.success === false) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("wallet_revokePermissions", [
              {
                eth_accounts: {},
              },
            ]);
            toast({
              title: "Message",
              description: "User not registered with given wallet address",
              variant: "destructive",
            });
          } else {
            localStorage.setItem(
              "user-profile",
              JSON.stringify(functionWorkerResponse)
            );
          }
        } else
          localStorage.setItem(
            "user-profile",
            JSON.stringify(functionProviderResponse)
          );
      }
    }
    if (!pathname.startsWith("/dashboard")) handleUserExist();
  }, [accounts]);
  const { isConnecting, handleConnectWallet } = useWalletConnect();
  const handleActiveState = (index: number) => {
    
    setIsActive(index);
  };
  const handleNavbarUserLogOut = async () => {
    localStorage.removeItem("account");
    localStorage.removeItem("user-profile");
    Cookies.remove('userData')
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("wallet_revokePermissions", [
      {
        eth_accounts: {},
      },
    ]);
    window.location.reload();
  };
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <nav>
      <div
        className={`flex justify-between px-[155px]   ${
          pathname.startsWith("/sign-up") ? "shadowm" : ""
        }`}
      >
        <div id="logo" className="py-5 px-5 flex items-center ">
          <Image
            src="/logo.svg"
            width={70}
            height={70}
            alt="metamask fox image"
            className="m-auto"
          />
          <h1 className="text-[40px]">
            <Link href={"/"}>jobPortal</Link>
          </h1>
        </div>
        {!(
          pathname.startsWith("/sign-up") || pathname.startsWith("/admin-login")
        ) && (
          <>
            <ul className="flex gap-x-6 items-center justify-center w-full  px-5 py-5">
              {navLinks.map((obj, index) => (
                <li
                  key={index}
                  className={`${
                    isActive === index ? "text-slate-400" : "text-slate-700"
                  } hover:cursor-pointer`}
                  onClick={() => handleActiveState(index)}
                >
                  <Link href={obj.link}>{obj.name}</Link>
                  
                </li>
              ))}
            </ul>

            {localStorage.getItem("account") && (
              <DropDownMenu
                navbar={true}
                navbarLogout={handleNavbarUserLogOut}
                trigger={<UserRound />}
                className="m-auto"
              />
            )}

            <AlertDialog
              open={alertOpen}
              onOpenChange={(open) => console.log("hi")}
            >
              <AlertDialogTrigger asChild>
                {localStorage.getItem("account") == null && (
                  <div id="button" className="flex items-center py-5 px-5">
                    <Button
                      className="rounded-xl"
                      onClick={() => setAlertOpen(true)}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent className=" bg-gray-200 gap-0">
                <AlertDialogCancel className=" w-min ml-auto border-none bg-gray-200 hover:bg-gray-200 ">
                  <X onClick={() => setAlertOpen(false)} />
                </AlertDialogCancel>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center mb-5 text-[24px]">
                    <Image
                      src={"logo.svg"}
                      width={101}
                      height={101}
                      alt="metamask fox image"
                      className="m-auto"
                    />
                    Connect to JobPortal
                  </AlertDialogTitle>
                  <AlertDialogDescription className=" py-5">
                    <button
                      className={`flex justify-start items-center gap-x-5  shadow-md rounded-lg w-[75%] m-auto  bg-gray-100 hover:bg-gray-200`}
                      disabled={isConnecting}
                      onClick={async () => {
                        if (await handleConnectWallet()) setAlertOpen(false);
                      }}
                    >
                      <Image
                        src={"meta-fox.svg"}
                        width={33}
                        height={33}
                        alt="metamask fox image"
                        className="ml-2"
                      />
                      <p className="py-3 text-[16px] font-semibold text-black">
                        MetaMask
                      </p>
                      {isConnecting ? (
                        <Loader2 className=" animate-spin absolute left-96" />
                      ) : (
                        ""
                      )}
                    </button>
                    <div className="flex w-full justify-center items-center mt-10">
                      <Separator className="mt-5 bg-gray-300 w-1/2 m-auto" />
                      <span>OR</span>
                      <Separator className="mt-5 bg-gray-300 w-1/2 m-auto" />
                    </div>
                    <button
                      className={`flex justify-start items-center gap-x-5  shadow-md rounded-t-lg w-[75%] m-auto  bg-gray-100 hover:bg-gray-200  mt-7`}
                      disabled={isConnecting}
                      onClick={() => {
                        router.replace("sign-up");
                        setAlertOpen(false);
                      }}
                    >
                      <LogIn className="ml-2 text-black" />
                      <p className="py-3 text-[16px] font-semibold text-black">
                        Sign up
                      </p>
                    </button>
                    <button
                      className={`flex justify-start items-center gap-x-5  shadow-md rounded-b-lg w-[75%] m-auto  bg-gray-100 hover:bg-gray-200  mt-[1px]`}
                      disabled={isConnecting}
                      onClick={() => {
                        router.replace("admin-login");
                        setAlertOpen(false);
                      }}
                    >
                      <Shield className="ml-2 text-black" />
                      <p className="py-3 text-[16px] font-semibold text-black">
                        Admin login
                      </p>
                    </button>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
