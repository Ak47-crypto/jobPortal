
import { useContext } from "react";
import { ethers } from "ethers";
import { ethersError } from "@/types/ethersError";
export const connectWallet = async ():Promise<string[] | ethersError | Error> => {
  
  if (!window.ethereum?.isMetaMask) {
    
    const providers = ethers.getDefaultProvider();
     return Error('MetaMask not installed; using read-only defaults');
    
  } 
    const provider = new ethers.BrowserProvider(window.ethereum);
    try {
      const { chainId } = await provider.getNetwork();
    const chainIdHex = ethers.toBeHex(chainId);
    if (chainIdHex != "0xaa36a7") {
      await provider.send("wallet_switchEthereumChain", [
        {
          chainId: "0xaa36a7",
        },
      ]);
    }
   const accounts:string[] = await provider.send("eth_requestAccounts", [])
      return accounts
    } catch (error:any) {
      
      return error 
      
    }






    // const accounts=await provider.send('eth_requestAccounts',[])
    
    // await provider.send("wallet_addEthereumChain",
    //  [{
    //     chainId: "0xaa36a7",
    //     rpcUrls: ["https://rpc2.sepolia.org"],
    //     chainName: "Sepolia Test Netwok",
    //     nativeCurrency: {
    //         name: "SepoliaETH",
    //         symbol: "SETH",
    //         decimals: 18
    //     },
    //     blockExplorerUrls: ["https://sepolia.etherscan.io/"]
    // }])
  
  
};
