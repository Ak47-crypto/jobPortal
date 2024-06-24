'use client'
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import abi from '@/contract/JobPortal.json'

async function ApproveRequest(){
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
   const contract=new ethers.Contract('jobportal',abi.abi,provider)

   return contract
}
export {ApproveRequest}