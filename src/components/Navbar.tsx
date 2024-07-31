"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { useWalletConnect } from "@/hooks/useWalletConnect";
import { useAppContext } from "@/context/SiteContext";
import { usePathname } from "next/navigation";
import useCheckUserExist from "@/hooks/user/useCheckUserExist";
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
import { UserType } from "@/types/userType";
// import {
//   checkUserProviderExist,
//   checkUserWorkerExist,
// } from "@/helpers/checkUserExist";

function Navbar() {
  // const [userData, setUserData] = useState<UserType | undefined>();

  const pathname = usePathname();
  const cookieData = Cookies.get("userData");
  const { checkUserProviderExist, checkUserWorkerExist } = useCheckUserExist();
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { setAccounts, setLogin, setUserData, accounts, login, userData } =
    useAppContext();
  const [isActive, setIsActive] = useState<number | null>(null);
  const [isLoading2, setIsLoading2] = useState<boolean>(true);
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Find work",
      link: "/jobs-and-opportunity",
    },
    {
      name: "Applications",
      link: "/application",
    },
    {
      name: "Post a job",
      link: "/job",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];
  useEffect(() => {
    if (cookieData) {
      setUserData(JSON.parse(cookieData));
      console.log("in useeffect navbar");
    }
    setIsLoading2(false);
  }, []);
  useEffect(() => {
    if (pathname.startsWith("/")) setIsActive(0);
    if (pathname.startsWith("/job")) setIsActive(3);
    if (pathname.startsWith("/jobs-and-opportunity")) setIsActive(1);
    if (pathname.startsWith("/application")) setIsActive(2);
    if (pathname.startsWith("/about")) setIsActive(4);
    if (pathname.startsWith("/contact")) setIsActive(5);

    async function handleUserExist() {
      // &&accounts[0]!='0x66d3126465b3d91804bcf0b271b3604db90003e6'
      if (accounts.length > 0) {
        const functionProviderResponse = await checkUserProviderExist(accounts);

        if (functionProviderResponse.success == false) {
          const functionWorkerResponse = await checkUserWorkerExist(accounts);

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
            // window.location.reload()
            //  if("data" in functionWorkerResponse)
            //     setUserData(functionWorkerResponse.data)
          }
        } else {
          // window.location.reload()
          // localStorage.setItem(
          //   "user-profile",
          //   JSON.stringify(functionProviderResponse)
          // );
          // if("data" in functionProviderResponse)
          //   setUserData(functionProviderResponse.data)
        }
      }
    }
    if (!pathname.startsWith("/dashboard")) {
      handleUserExist();
    }
  }, [accounts]);
  const { isConnecting, handleConnectWallet } = useWalletConnect();
  const handleActiveState = (index: number, obj: any) => {
    // router.replace(obj.link);
    setIsActive(index);
  };
  const handleNavbarUserLogOut = async () => {
    // localStorage.removeItem("account");
    // localStorage.removeItem("user-profile");
    try {
      setUserData(null);
      Cookies.remove("userData");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("wallet_revokePermissions", [
        {
          eth_accounts: {},
        },
      ]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  if (pathname.startsWith("/dashboard")) return <></>;
  return (
    <div>
      <div
        className={`flex justify-between px-[40px]   ${
          pathname.startsWith("/sign-up") ? "shadowm" : ""
        } ${pathname.startsWith("/about") ? "bg-blue-100" : ""}`}
      >
        <div id="logo" className="py-5  flex items-center ">
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
            <div className="flex gap-x-6 items-center justify-center w-full  px-5 py-5">
              {navLinks.map((obj, index) => (
                <Link
                  key={index + obj.link + obj.name}
                  className={`bg-inherit hover:bg-inherit ${
                    isActive === index ? "text-slate-400" : "text-slate-700"
                  } hover:cursor-pointer bg-white hover:bg-white ${
                    userData?.role === "worker" && obj.link === "/job"
                      ? "hidden"
                      : ""
                  } ${
                    userData?.role === "provider" && obj.link === "/application"
                      ? "hidden"
                      : ""
                  } ${
                    !userData && obj.link === "/application" ? "hidden" : ""
                  } ${!userData && obj.link === "/job" ? "hidden" : ""}`.trim()}
                  onClick={() => handleActiveState(index, obj)}
                  href={obj.link}
                >
                  {obj.name}
                </Link>
              ))}
            </div>
            {isLoading2 ? (
              <div className="flex items-center  py-5 px-7 ">
                <Loader2 className="animate-spin" />
              </div>
            ) : userData?.walletAddress ? (
              <DropDownMenu
                navbar={true}
                navbarLogout={handleNavbarUserLogOut}
                trigger={<UserRound />}
                className="m-auto py-5 px-7"
              />
            ) : (
              <AlertDialog open={alertOpen}>
                <AlertDialogTrigger asChild>
                  {!userData?.walletAddress && (
                    <div id="button" className="flex items-center py-5 px-5">
                      <Button
                        className={`rounded-xl ${(pathname.startsWith("/about")||pathname.startsWith("/contact"))&&"bg-indigo-500 hover:bg-indigo-600"} text-white`}
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
                        src={"/logo.svg"}
                        width={101}
                        height={101}
                        alt="metamask fox image"
                        className="m-auto"
                      />
                      Connect to JobPortal
                    </AlertDialogTitle>
                    {/* <AlertDialogDescription className=" py-5">
                    <button
                      className={`flex justify-start items-center gap-x-5  shadow-md rounded-lg w-[75%] m-auto  bg-gray-100 hover:bg-gray-200`}
                      disabled={isConnecting}
                      onClick={async () => {
                        if (await handleConnectWallet()) setAlertOpen(false);
                      }}
                    >
                      <Image
                        src={"/meta-fox.svg"}
                        width={33}
                        height={33}
                        alt="metamask fox image"
                        className="ml-2"
                      />
                      <span className="py-3 text-[16px] font-semibold text-black">
                        MetaMask
                      </span>
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
                      <span className="py-3 text-[16px] font-semibold text-black">
                        Sign up
                      </span>
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
                      <span className="py-3 text-[16px] font-semibold text-black">
                        Admin login
                      </span>
                    </button>
                  </AlertDialogDescription> */}
                    <AlertDialogTitle className="py-5">
                      <div className="flex flex-col items-center">
                        <button
                          className={`flex justify-start items-center gap-x-5 shadow-md rounded-lg w-[75%] m-auto bg-gray-100 hover:bg-gray-200`}
                          disabled={isConnecting}
                          onClick={async () => {
                            if (await handleConnectWallet())
                              setAlertOpen(false);
                          }}
                        >
                          <Image
                            src={"/meta-fox.svg"}
                            width={33}
                            height={33}
                            alt="metamask fox image"
                            className="ml-2"
                          />
                          <span className="py-3 text-[16px] font-semibold text-black">
                            MetaMask
                          </span>
                          {isConnecting ? (
                            <Loader2 className="animate-spin absolute left-96" />
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
                          className={`flex justify-start items-center gap-x-5 shadow-md rounded-t-lg w-[75%] m-auto bg-gray-100 hover:bg-gray-200 mt-7`}
                          disabled={isConnecting}
                          onClick={() => {
                            router.push("/sign-up");
                            setAlertOpen(false);
                          }}
                        >
                          <LogIn className="ml-2 text-black" />
                          <span className="py-3 text-[16px] font-semibold text-black">
                            Sign up
                          </span>
                        </button>

                        <button
                          className={`flex justify-start items-center gap-x-5 shadow-md rounded-b-lg w-[75%] m-auto bg-gray-100 hover:bg-gray-200 mt-[1px]`}
                          disabled={isConnecting}
                          onClick={() => {
                            router.push("/admin-login");
                            setAlertOpen(false);
                          }}
                        >
                          <Shield className="ml-2 text-black" />
                          <span className="py-3 text-[16px] font-semibold text-black">
                            Admin login
                          </span>
                        </button>
                      </div>
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
