"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useApproveRequest } from "@/hooks/admin/useApproveRequest";
import {
  BarChart2,
  CircleDashed,
  User,
  ChevronDown,
  WalletMinimal,
  Loader2,
  Trash2,
  Check,
  Pizza,
  Terminal,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useWalletConnect } from "@/hooks/useWalletConnect";
// import { User } from 'next-auth';
import { useSession, signOut } from "next-auth/react";
import dayjs from "dayjs";
import DropDownMenu from "@/components/DropDownMenu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Separator } from "@/components/ui/separator";
import { ethers } from "ethers";
import { useAppContext } from "@/context/SiteContext";
import { useToast } from "@/components/ui/use-toast";
interface User {
  id?: string;
  name: string;
  email: string;
  experience?: string;
  skills?: string;
  walletAddress: string;
  role: string;
  createdAt: Date;
}
interface Alluser {
  users: Array<User>;
  workerCount: number;
  providerCount: number;
  adminCount: number;
}
const initialUserData: Alluser = {
  users: [],
  workerCount: 0,
  providerCount: 0,
  adminCount: 0,
};
// interface Obj {
//   name: string;
//   email: string;
//   role: string;
//   walletAddress: string;
//   createdAt: Date;
//   experience?:string;
//   skills?:string
// }
function Dashboard() {
  const alertRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState<number>(0);
  const { setAccounts, accounts } = useAppContext();
  const { toast } = useToast();
  const { data: session } = useSession();
  const { isConnecting, handleConnectWallet } = useWalletConnect();
  const [requesData, setRequestData] = useState<User[]>([]);
  const [userData, setUserData] = useState<Alluser>(initialUserData);
  const [isActive, setIsActive] = useState<number>(1);
  const [chevron, setChevron] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { isTransacting, requestIndex, approveRequest, setIsTransacting } =
    useApproveRequest();
  // const [requestIndex,setRequestIndex]=useState<any>();
  const handleActiveState = (index: number) => {
    setIsActive(index);
    localStorage.setItem("isActive", isActive?.toString());
  };
  const handleDeletePendingRequests = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch("/api/delete-user-request", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: requesData[index].email,
          role: requesData[index].role,
        }),
      });
      const data = await response.json();
      if (data.success == true) {
        toast({
          title: "Message",
          description: data.message,
        });
        setAlertOpen(false);
        setRequestData((prevRequestData) => {
          return prevRequestData.filter((_, i) => i !== index);
        });
        // TODO:remove it later
        // setUserData((prevRequestData) => {
        //   const updatedUser = prevRequestData?.users.filter(
        //     (_, i) => i !== index
        //   );
        //   return { ...prevRequestData, users: updatedUser };
        // });
        // location.reload()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApproveRequest = async (index: number, obj: User) => {
    const response = await approveRequest(obj, index);
    try {
      if (!response) {
        return;
      } else {
        const response2 = await fetch("/api/update-pending-request", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: obj.email,
            role: obj.role,
          }),
        });
        const data = await response2.json();
        if (data.success) {
          setRequestData((prevRequestData) => {
            return prevRequestData.filter((_, i) => i !== index);
          });
          userData.users.push(obj);
        }
        if (!data.success) {
          toast({
            title: "Message",
            description:
              "Backend user record not updated, please update it manually",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Message",
        description: "Error occured",
        variant: "destructive",
      });
    } finally {
      setIsTransacting(false);
    }
  };

  const handleAdminConnectWallet = async () => {
    await handleConnectWallet();
    if (localStorage.getItem("account")) {
      if (!session || !session.user) return;
      else {
        if (!(session.user.walletAddress == localStorage.getItem("account"))) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          provider
            .send("wallet_revokePermissions", [
              {
                eth_accounts: {},
              },
            ])
            .then(() =>
              toast({
                title: "Message",
                description: "Admin wallet address mismatched",
                variant: "destructive",
              })
            );
        } else
          toast({
            title: "Message",
            description: "Wallet connected",
            variant: "default",
          });
      }
    }
  };
  useEffect(() => {
    fetch("/api/fetch-user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          setRequestData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // post
    fetch("/api/fetch-user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          setUserData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const toggleChevron = () => {
    setChevron((prev) => !prev);
  };

  const handleAdminLogOut = async () => {
    try {
      localStorage.removeItem("account");
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("wallet_revokePermissions", [
      {
        eth_accounts: {},
      },
    ]);
    signOut();
    // window.location.reload();
    } catch (error) {
      console.log(error);
      localStorage.removeItem("account");
      signOut();
    }
    
  };
  if (!session || !session.user) {
    return <div></div>;
  }
  return (
    <main className="h-screen overflow-hidden">
      <div className="grid grid-cols-[auto,1fr] h-full">
        <section id="left" className="px-[32px] py-[40px] col-auto bg-white">
          <Image
            src={"logo.svg"}
            width={70}
            height={70}
            alt="metamask fox image"
            className="mb-[56px]"
          />
          <ul className=" flex flex-col gap-y-8 text-[#757575]">
            <div
              className={`flex gap-x-3 hover:cursor-pointer ${
                isActive == 1 ? "text-[#4A85F6]" : ""
              }`}
              onClick={() => handleActiveState(1)}
            >
              <BarChart2 />
              <li>Users</li>
            </div>
            <div
              className={`flex gap-x-3 hover:cursor-pointer ${
                isActive == 2 ? "text-[#4A85F6]" : ""
              }`}
              onClick={() => handleActiveState(2)}
            >
              <CircleDashed />
              <li>Requests</li>
              {requesData.length == 0 ? (
                <div className="flex items-center invisible">
                  <input
                    type="text"
                    placeholder={requesData.length.toString()}
                    disabled
                    className="rounded-[100%] w-[20px] h-[20px] bg-black placeholder:text-center placeholder:text-white  "
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder={requesData.length.toString()}
                    disabled
                    className="rounded-[100%] w-[20px] h-[20px] bg-black placeholder:text-center placeholder:text-white  "
                  />
                </div>
              )}
            </div>
          </ul>
        </section>
        <section
          id="right"
          className="bg-[#E5E5E5] px-[32px] py-[40px] overflow-y-auto h-screen"
        >
          <header className="flex justify-between">
            <div id="left">
              <h1 className="font-semibold text-[20px]">
                Hello, {session?.user.name}
              </h1>
              <p className="text-[#757575]">Have a nice day</p>
            </div>
            <div id="right" className="flex gap-x-4 items-center ">
              <Button
                className="flex items-center bg-white p-4 rounded-xl shadow-md  hover:bg-[#E5E5E5] hover:scale-[107%]  transition-all  ease-in-out duration-300 font-normal text-black"
                onClick={handleAdminConnectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Connecting...</span>
                  </>
                ) : (
                  <>
                    <WalletMinimal className="w-[45px]x h-[45px]x text-black" />
                    {localStorage.getItem("account") ? (
                      <span className="ml-2">Wallet connected</span>
                    ) : (
                      <span className="ml-2">Connect wallet</span>
                    )}
                  </>
                )}
              </Button>

              <div className="rounded-full w-[45px] h-[45px] bg-[#BFBFBF]"></div>
              <div>
                <h1 className="font-semibold text-[16px]">
                  {session?.user.email}
                </h1>
                <p className="text-sm">admin</p>
              </div>
              <DropDownMenu
                adminPage={true}
                trigger={
                  <ChevronDown
                    className={`transform ${
                      chevron ? "rotate-180" : ""
                    } transition duration-300`}
                  />
                }
                adminLogout={handleAdminLogOut}
                onClick={toggleChevron}
              />
            </div>
          </header>
          {isActive == 1 && (
            <>
              <h1 className="text-[#4A85F6] text-[24px] font-bold mt-10">
                Users
              </h1>
              <div className="grid grid-cols-4 gap-x-5 mt-5">
                <div className="bg-white rounded-xl shadow-md p-5">
                  <p className="text-[16px] text-[#8F9BB3] mb-2">Total users</p>
                  <p className="font-bold">{userData?.users?.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5">
                  <p className="text-[16px] text-[#8F9BB3] mb-2">
                    Total providers
                  </p>
                  <p className="font-bold">{userData?.providerCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5">
                  <p className="text-[16px] text-[#8F9BB3] mb-2">
                    Total workers
                  </p>
                  <p className="font-bold">{userData?.workerCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5">
                  <p className="text-[16px] text-[#8F9BB3] mb-2">
                    Total admins
                  </p>
                  <p className="font-bold">{userData?.adminCount}</p>
                </div>
              </div>
              {/* table */}
              <div className="mt-5">
                <p className="p-4 bg-white rounded-t-xl">List users</p>
                <Table>
                  <TableCaption>A list of all users.</TableCaption>

                  <TableHeader>
                    <TableRow className="bg-[#EFF4FA] hover:bg-[#EFF4FA]">
                      <TableHead className="w-[100px]  text-[#8F9BB3]">
                        Name
                      </TableHead>
                      <TableHead className="text-[#8F9BB3]">Email</TableHead>
                      <TableHead className="text-[#8F9BB3]">
                        WalletAddress
                      </TableHead>
                      <TableHead className="text-[#8F9BB3]">
                        Create date
                      </TableHead>
                      <TableHead className="text-[#8F9BB3]">Role</TableHead>
                      <TableHead className="text-right  text-[#8F9BB3]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white shadow-lg rounded-xl">
                    {userData?.users?.map((obj: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell
                          className={`font-medium ${
                            index == userData?.users?.length - 1
                              ? "rounded-bl-xl"
                              : ""
                          }`}
                        >
                          {obj.name}
                        </TableCell>
                        <TableCell>{obj.email}</TableCell>
                        <TableCell className="text-justify">
                          {obj.walletAddress}
                        </TableCell>
                        <TableCell>
                          {dayjs(obj.createdAt).format("MMM D, YYYY h:mm A")}
                        </TableCell>
                        <TableCell>
                          <Button className="bg-[#0095FF] w-[111px] rounded-lg hover:cursor-text hover:bg-[#0095FF]">
                            {obj.role}
                          </Button>
                        </TableCell>
                        <TableCell
                          className={`text-right ${
                            index == userData?.users?.length - 1
                              ? "rounded-br-xl"
                              : ""
                          }`}
                        >
                          <Trash2
                            className="ml-auto text-[#C5CEE0] scale-90 hover:cursor-pointer hover:text-gray-500 transition-colors ease-in-out"
                            onClick={() => {
                              if (alertRef.current) {
                                alertRef.current.click();
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {isActive == 2 && (
            <>
              <h1 className="text-[#4A85F6] text-[24px] font-bold mt-10">
                Pending requests
              </h1>
              {requesData.length != 0 ? (
                <>
                  <div className="mt-5">
                    <Table>
                      <TableCaption>A list of pending requests.</TableCaption>
                      <TableHeader>
                        <TableRow className="bg-[#EFF4FA] ">
                          <TableHead className="w-[100px] rounded-tl-xl text-[#8F9BB3]">
                            Name
                          </TableHead>
                          <TableHead className="text-[#8F9BB3]">
                            Email
                          </TableHead>

                          <TableHead className="text-[#8F9BB3]">
                            walletAddress
                          </TableHead>

                          <TableHead className="text-[#8F9BB3]">
                            Create date
                          </TableHead>
                          <TableHead className="text-[#8F9BB3]">Role</TableHead>
                          <TableHead className="text-right rounded-tr-xl text-[#8F9BB3]">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white rounded-xl shadow-lg">
                        {requesData.map((obj, index) => (
                          <TableRow key={index}>
                            <TableCell
                              className={`font-medium ${
                                index == requesData.length - 1
                                  ? "rounded-bl-xl"
                                  : ""
                              }`}
                            >
                              {obj.name}
                            </TableCell>
                            <TableCell>{obj.email}</TableCell>

                            <TableCell className="text-justify">
                              {obj.walletAddress}
                            </TableCell>
                            <TableCell>
                              {dayjs(obj.createdAt).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </TableCell>
                            <TableCell>
                              <Button className="bg-[#0095FF] w-[111px] rounded-lg hover:cursor-text hover:bg-[#0095FF]">
                                {obj.role}
                              </Button>
                            </TableCell>
                            <TableCell
                              className={`${
                                index == requesData?.length - 1
                                  ? "rounded-br-xl"
                                  : ""
                              }`}
                            >
                              <span className="flex justify-end gap-2">
                                {isTransacting && index === requestIndex ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  <Check
                                    className=" text-[#C5CEE0] scale-90 hover:cursor-pointer hover:text-gray-500 transition-colors ease-in-out"
                                    onClick={
                                      isTransacting
                                        ? undefined
                                        : () => handleApproveRequest(index, obj)
                                    }
                                  />
                                )}
                                <Trash2
                                  className=" text-[#C5CEE0] scale-90 hover:cursor-pointer hover:text-gray-500 transition-colors ease-in-out"
                                  // onClick={()=>{ if (alertRef.current) {
                                  //   {alertRef.current.click();
                                  //     setIndex(index)
                                  //   }
                                  // }}}
                                  onClick={
                                    isTransacting
                                      ? undefined
                                      : () => setAlertOpen(true)
                                  }
                                />
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <>
                  <div className=" mt-32  flex flex-col justify-center items-center gap-5">
                    <Pizza className="w-40 h-40 text-gray-300  animate-spinx" />
                    {/* <Alert className="bg-[#E5E5E5] border border-dashed ">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Heads up!</AlertTitle>
                      <AlertDescription>
                        You can add components to your app using the cli.
                      </AlertDescription>
                    </Alert> */}
                    <div className="border border-dashed border-black rounded-md p-5 ml-10 ">
                      <Terminal className="h-4 w-4 inline" />
                      <span>You are all catched up no pending request</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </div>

      {/* alert dialog boxes */}
      <AlertDialog open={alertOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" ref={alertRef} className="hidden">
            Show Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected account and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePendingRequests}
              disabled={isConnecting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

export default Dashboard;
