"use client";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import abi from "@/contract/JobPortal.json";
import { useAppContext } from "@/context/SiteContext";
import { ProviderRpcError } from "@/types/ethersError";
import { useState } from "react";
interface Obj {
  name: string;
  email: string;
  role: string;
  walletAddress: string;
  createdAt: Date;
}
function useApproveRequest() {
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const [requestIndex,setRequestIndex]=useState<any>();
  const { toast } = useToast();
  const approveRequest = async (obj: Obj,index:number) => {
    if (localStorage.getItem("account")) {
      try {
        setIsTransacting(true);
        setRequestIndex(index)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0xA514E1C530714338356382067D02188233a43C6f",
          abi.abi,
          signer
        );

        if (obj.role == "provider") {
          const contractResponse = await contract.registerProvider(
            obj.name,
            obj.email,
            obj.walletAddress
          );
          const response = await contractResponse.wait();
          if (response.status === 1) {
            toast({
              title: "Message",
              description: "Provider registered successfully",
              variant: "default",
            });
            return true;
          }
          else
            return false;

          
        }
      } catch (error: any) {
        if ("shortMessage" in error) {
          toast({
            title: "Message",
            description: error.shortMessage,
            variant: "destructive",
          });
        } else
          toast({
            title: "Message",
            description: error.message,
            variant: "destructive",
          });
          return false;
      } finally {
        // setIsTransacting(false);
      }
    } else
      toast({
        title: "Message",
        description: "Wallet not connected",
        variant: "destructive",
      });
      return false;
  };
  return { approveRequest,isTransacting,setIsTransacting,requestIndex };
}
export { useApproveRequest };
