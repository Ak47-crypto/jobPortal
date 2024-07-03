import React, { useState } from 'react'
import abi from "@/contract/JobPortal.json";
import Cookies from 'js-cookie'
import { ethersError } from '@/types/ethersError';
import { ethers } from 'ethers';
type Data= {
    title: string;
    location: string;
    salary: string;
    description: string;
}
function useJobPost() {
    const [isTransacting, setIsTransacting] = useState<boolean>(false);

    const jobPost=async(data:Data):Promise<boolean|ethersError>=>{
        try {
            setIsTransacting(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
                abi.abi,
                signer
              );
              const contractResponse = await contract.addJob(
                data.title,
                data.location,
                data.salary,
                data.description
              );
              const response = await contractResponse.wait();
              if (response.status === 1) {
                return true;
              }else
              return false;
        } catch (error:any) {
            throw error
            // return error;
        }finally{
            setIsTransacting(false);
        }
    }
  return {jobPost,isTransacting}
}

export default useJobPost