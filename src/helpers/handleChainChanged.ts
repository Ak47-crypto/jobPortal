import { ethers } from "ethers"
export const handleChainChanged=async(chainId2:any)=>{
    const provider = new ethers.BrowserProvider(window.ethereum)
    console.log('in chain changed',chainId2)
    
    
    if(chainId2!='0xaa36a7'){
        await provider.send("wallet_switchEthereumChain",
        [
          {
            chainId: "0xaa36a7"
          }
        ])
        window.location.reload()

    }
    window.location.reload()
    
}