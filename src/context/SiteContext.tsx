'use client'
import { createContext, useState, ReactNode, FC,useContext } from 'react';

interface MyContextProps {
  login:boolean;
  accounts: string[];
  setAccounts: (value: string[]) => void;
  setLogin:(value:boolean)=>void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyProvider=({children}:{children:React.ReactNode}) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  let [login,setLogin]=useState<boolean>(false)
  return (
    <MyContext.Provider value={{ accounts,login, setAccounts,setLogin }}>
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
