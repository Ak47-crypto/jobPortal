'use client'
import { createContext, useState, ReactNode, FC,useContext } from 'react';
import { ethers } from 'ethers';
interface MyContextProps {
  login:boolean;
  accounts: string[];
  provider?:ethers.JsonRpcProvider;
  signer?:ethers.JsonRpcSigner;
  stateValue:string;
  setAccounts: (value: string[]) => void;
  setLogin:(value:boolean)=>void;
  setProvider:(provider:ethers.JsonRpcProvider)=>void;
  setSigner:(signer:ethers.JsonRpcSigner)=>void;
  setStateValue:(value: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);



export const MyProvider=({children}:{children:React.ReactNode}) => {
  const [stateValue,setStateValue]=useState<string>("")
  const [signer,setSigner]=useState<ethers.JsonRpcSigner>()
  const [provider,setProvider]=useState<ethers.JsonRpcProvider>()
  const [accounts, setAccounts] = useState<string[]>([]);
  let [login,setLogin]=useState<boolean>(false)
  return (
    <MyContext.Provider value={{ accounts,login,provider,signer,stateValue,setAccounts,setLogin,setProvider,setSigner,setStateValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useAppContext=()=>{
    const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider || its undefined');
  }
  return context;
}
