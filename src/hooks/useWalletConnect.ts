import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/SiteContext";
import { connectWallet } from "@/helpers/connectWallet";

export function useWalletConnect() {
  const { toast } = useToast();
  const { setAccounts, setLogin, login } = useAppContext();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    console.log(localStorage.getItem("isLogged"), login);
    if (localStorage.getItem("account") == null) {
      setIsConnecting(true);
      const data = await connectWallet();
      if (Array.isArray(data)) {
        setAccounts(data);
        setIsConnecting(false);
        return 1;
        // setLogin(true);
      } else if ("shortMessage" in data) {
        toast({
          title: "Error",
          description: data.shortMessage,
          variant: "destructive",
        });
        setIsConnecting(false);
        return 0;
      } else{
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        setIsConnecting(false);
        return 0;
      }
      
    } else {
      toast({
        title: "Message",
        description: "Already logged in",
        variant: "default",
      });
      setIsConnecting(false);
      return 0;
      
    }
  };

  return { isConnecting, handleConnectWallet };
}
