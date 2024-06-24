//  global.d.ts
// interface Window {
//     ethereum: any;
//   }
import { BrowserProvider, Eip1193Provider } from "ethers/types/providers";
import { MetaMaskInpageProvider } from '@metamask/providers';
import "next-auth";
import { DefaultUser } from "next-auth";

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider;
//   }
// }
declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider
  }
}
  
declare module "next-auth" {
  interface User {
    walletAddress?:string;
  }
  interface Session {
    user: {
      walletAddress?:string;
    } & DefaultUser["user"];
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    walletAddress?:string
  }
}