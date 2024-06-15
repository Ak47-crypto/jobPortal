import React from 'react'
import { ethers } from 'ethers'
import { UserRound, User ,LogOut} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function DropDownMenu() {
    const handleLogOut=async ()=>{
        localStorage.removeItem('account')
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('wallet_revokePermissions',[
            {
                eth_accounts:{}
            }
        ])
        window.location.reload()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <UserRound />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    
                    <User className="mr-2 h-4 w-4"/>
                    <span >Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span onClick={handleLogOut}>Log Out</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenu