//  global.d.ts
// interface Window {
//     ethereum: any;
//   }
import { BrowserProvider, Eip1193Provider } from "ethers/types/providers";
import { MetaMaskInpageProvider } from '@metamask/providers';

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
  