'use client'
import { handleChainChanged } from '@/helpers/handleChainChanged';
import { useEffect } from 'react'
import { useHandleAccountsChanged } from "@/hooks/useHandleAccountsChanged";
import { useAppContext } from "@/context/SiteContext";
import { useToast } from "@/components/ui/use-toast"
function MetaMaskLIstener() {
    const { handleAccountChanged } = useHandleAccountsChanged()
    const {accounts}=useAppContext()
    const { toast } = useToast()
    useEffect(() => {
        if (!window.ethereum?.isMetaMask) {
            console.log('MetaMask is not installed');
            return; // Exit the useEffect callback
        }

        window.ethereum.on("chainChanged", (chainId) => handleChainChanged(chainId));
        window.ethereum.on("accountsChanged", (accounts) => handleAccountChanged(accounts))
        console.log("in use Effect")
        // Clean-up function
        return () => {
            window.ethereum.removeListener("chainChanged", handleChainChanged);
            window.ethereum.removeListener("accountsChanged", handleAccountChanged)
        };
    }, []);

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
    return null;
}


export default MetaMaskLIstener