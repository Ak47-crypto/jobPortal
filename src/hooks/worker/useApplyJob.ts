import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "@/contract/JobPortal.json";
import { ethersError } from "@/types/ethersError";
type Data = {
  _providerAddress: string;
  _jobId: number;
};
function useApplyJob() {
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const applyJob = async (
    _providerAddress: string,
    _jobId: number
  ): Promise<boolean | ethersError> => {
    try {
      setIsTransacting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        abi.abi,
        signer
      );
      const contractResponse = await contract.applyForJob(
        _providerAddress,
        _jobId
      );
      const response = await contractResponse.wait();
      if (response.status === 1) {
        return true;
      } else return false;
    } catch (error: any) {
      throw error;
    } finally {
      setIsTransacting(false);
    }
  };
  return { applyJob, isTransacting };
}

export default useApplyJob;
