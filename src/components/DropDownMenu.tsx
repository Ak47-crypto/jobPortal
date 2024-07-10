import React from "react";
import Cookies from "js-cookie";
import { ethers } from "ethers";
import { UserType } from "@/types/userType";
import { UserRound, User, LogOut, BriefcaseBusiness } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface isForType extends React.HTMLAttributes<HTMLDivElement> {
  navbar?: boolean;
  adminPage?: boolean;
  trigger: any;
  navbarLogout?: () => Promise<void>;
  adminLogout?: () => Promise<void>;
}
function DropDownMenu({
  navbar = false,
  adminPage = false,
  navbarLogout,
  trigger,
  adminLogout,
  onClick,
  ...rest
}: isForType) {
  // const handleLogOut=async ()=>{
  //     localStorage.removeItem('account')
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     await provider.send('wallet_revokePermissions',[
  //         {
  //             eth_accounts:{}
  //         }
  //     ])
  //     window.location.reload()
  // }
const cookieData=Cookies.get("userData")
const userData:UserType=JSON.parse(cookieData as string) 
  return (
    <>
      <div {...rest}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {navbar && trigger}
            {adminPage && <div onClick={onClick}>{trigger}</div>}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {navbar && (
              <>
              <Link href={`/user/profile`}>
                <DropdownMenuItem className="w-full">
                  <User className="mr-2 h-4 w-4" />

                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              {(userData.role==='provider')&&
               <Link href={`/job/job-list`}>
               <DropdownMenuItem className="w-full">
                 <BriefcaseBusiness className="mr-2 h-4 w-4" />
                 <span>Jobs</span>
               </DropdownMenuItem>
             </Link>}
             </>
            )}

            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              {navbar && <span onClick={navbarLogout}>Log Out</span>}
              {adminPage && <span onClick={adminLogout}>Log Out</span>}
            </DropdownMenuItem>

            {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* admin */}
    </>
  );
}

export default DropDownMenu;
