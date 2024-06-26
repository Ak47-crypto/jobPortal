import { ethers } from "ethers";
import abi from "@/contract/JobPortal.json";
interface User {
  id?: number;
  name: string;
  email: string;
  experienc?: string;
  skills?: string;
  isActive: string;
  role?: string;
  walletAddress?: string;
  createdAt?: Date;
}
interface returnObj {
  success: boolean;
  data: User;
}
interface errorObj {
  success: boolean;
  message: string;
}
export const checkUserProviderExist = async (
  user: Array<string>
): Promise<returnObj | errorObj> => {
  const isProviderExist = false;
  const isWorkerExist = false;
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      abi.abi,
      provider
    );
    const contractProvider = await contract.getProvider(user[0]);
    const [isActive, id, name, email, address, timestamp] = contractProvider;
    const userReturn: User = {
      id: ethers.toNumber(id),
      name,
      email,
      isActive,
      role: "provider",
      walletAddress: address,
      createdAt: new Date(ethers.toNumber(timestamp)),
    };
    return { success: true, data: userReturn };
  } catch (error: any) {
    if (ethers.isError(error, "CALL_EXCEPTION")) {
      return { success: false, message: error.shortMessage };
    }
    return { success: false, message: error.message };
  }
};

export const checkUserWorkerExist = async (
  user: Array<string>
): Promise<returnObj | errorObj> => {
  const isProviderExist = false;
  const isWorkerExist = false;
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      abi.abi,
      provider
    );
    const contractWorker = await contract.getWorker(user[0]);
    console.log(contractWorker);
    const [isActive, name, email, experience, skills] = contractWorker;
    const userReturn: User = {
      name,
      email,
      isActive,
      role: "worker",
      walletAddress: user[0],
      // createdAt: new Date(ethers.toNumber(timestamp))
    };
    return { success: true, data: userReturn };
  } catch (error: any) {
    if (ethers.isError(error, "CALL_EXCEPTION")) {
      return { success: false, message: error.shortMessage };
    }
    return { success: false, message: error.message };
  }
};
