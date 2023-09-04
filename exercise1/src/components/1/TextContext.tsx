import React,{ createContext, useState } from "react";

type StringContextType = {
  str: string;
  setStr: React.Dispatch<React.SetStateAction<string>>
}

type StringContextProviderProps = {
  children: React.ReactNode;
}

export const StringContext = createContext<StringContextType | null>(null);

const TextContextProvider: React.FC<StringContextProviderProps> = ({children}) => {

  const [str, setStr] = useState('');

  return (
    <StringContext.Provider value={{ str, setStr }}>
      {children}
    </StringContext.Provider>
  )
}

export default TextContextProvider;