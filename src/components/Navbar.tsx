'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import { Button } from './ui/button'
import { useWalletConnect } from '@/hooks/useWalletConnect'
import { useAppContext } from "@/context/SiteContext";
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
} from "@/components/ui/alert-dialog"
import { connectWallet } from '@/helpers/connectWallet'
import { X } from 'lucide-react'
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react'
import DropDownMenu from '@/components/DropDownMenu'
function Navbar() {
    const [alertOpen, setAlertOpen] = useState<boolean>(false)
    const { toast } = useToast()
    const { setAccounts, setLogin, accounts, login } = useAppContext();
    const [isActive, setIsActive] = useState<number | null>(null)
    const navLinks = [
        {
            name: "Find work"
        },
        {
            name: "Applications"
        },
        {
            name: "Post a job"
        }
    ]
    // useEffect(() => {
    //     if (accounts.length > 0) {
    //         localStorage.setItem('account', accounts[0])
    //         toast({
    //             title: 'Message',
    //             description: "user logged in"
    //         })
    //         // localStorage.setItem('isLogged', login.toString())
    //     }
    //     else if (accounts.length == 0)
    //         toast({
    //             title: 'Message',
    //             description: "user logged out"
    //         })
    // }, [accounts])
    const { isConnecting, handleConnectWallet } = useWalletConnect()
    const handleActiveState = (index: number) => {
        setIsActive(index)
    }

    return (
        <nav>
            <div className='flex justify-between px-[155px] py-[10px]'>
                <div id='logo' className='py-5 px-5 flex items-center '>
                    <Image
                        src={'logo.svg'}
                        width={70}
                        height={70}
                        alt='metamask fox image'
                        className='m-auto'
                    />
                    <h1 className='text-[40px]'>jobPortal</h1>
                </div>

                <ul className='flex gap-x-6 items-center justify-center w-full  px-5 py-5'>
                    {
                        navLinks.map((obj, index) => (
                            <li key={index}
                                className={`${isActive === index ? "text-slate-400" : "text-slate-700"} hover:cursor-pointer`}
                                onClick={() => handleActiveState(index)}
                            >
                                {obj.name}
                            </li>
                        ))
                    }
                </ul>


                {localStorage.getItem('account') && <DropDownMenu />}

                <AlertDialog
                    open={alertOpen}
                    onOpenChange={(open) => console.log('hi')}
                >
                    <AlertDialogTrigger asChild>
                        {localStorage.getItem('account') == null && <div id='button' className='flex items-center py-5 px-5'>
                            <Button className='rounded-xl' onClick={() => setAlertOpen(true)}>Login</Button>
                        </div>}
                    </AlertDialogTrigger>
                    <AlertDialogContent className=' bg-gray-200 gap-0'>
                        <AlertDialogCancel className=' w-min ml-auto border-none bg-gray-200 hover:bg-gray-200 '><X /></AlertDialogCancel>
                        <AlertDialogHeader>


                            <AlertDialogTitle className='text-center mb-5 text-[24px]'>
                                <Image
                                    src={'logo.svg'}
                                    width={101}
                                    height={101}
                                    alt='metamask fox image'
                                    className='m-auto'
                                />
                                Connect to JobPortal</AlertDialogTitle>
                            <AlertDialogDescription className=' py-5'>
                                <button className={`flex justify-start items-center gap-x-5  shadow-md rounded-lg w-[75%] m-auto  bg-gray-100 hover:bg-gray-200`} disabled={isConnecting} onClick={async () => {
                                    if (await handleConnectWallet())
                                        setAlertOpen(false)
                                }
                                }>
                                    <Image
                                        src={'meta-fox.svg'}
                                        width={33}
                                        height={33}
                                        alt='metamask fox image'
                                        className='ml-2'
                                    />
                                    <p className='py-3 text-[16px] font-semibold text-black'>MetaMask</p>
                                    {isConnecting ? <Loader2 className=' animate-spin absolute left-96' /> : ''
                                    }
                                </button>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>

                            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </nav>
    )
}

export default Navbar