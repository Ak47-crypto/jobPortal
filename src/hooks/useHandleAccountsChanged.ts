import { useAppContext } from "@/context/SiteContext";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
export function useHandleAccountsChanged() {
  const { toast } = useToast();
  const { setAccounts } = useAppContext();
  const { data: session } = useSession();
  const handleAccountChanged = (data: any) => {
    setAccounts(data);
    if (data.length > 0) {
      localStorage.setItem("account", data[0]);
      console.log(data,'in account changed hook');
      
      toast({
        title: "Message",
        description: "user logged in",
      });
      // localStorage.setItem('isLogged', login.toString())
    } else if (data.length == 0) {
      localStorage.removeItem("account");
      console.log(data,'in account changed hook in logged out if');
      toast({
        title: "Message",
        description: "User logged out",
      });
    }
  };
  return { handleAccountChanged };
}
