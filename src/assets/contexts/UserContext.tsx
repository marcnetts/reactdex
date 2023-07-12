import { ReactNode, createContext, useContext, useState } from "react";

type UserContextProps = {
  children: ReactNode;
}

type UserContextType = { //not necessary for now
  isDetailsOpened: boolean;
  setIsDetailsOpened: (newState: boolean) => void;
  // selectedMon: number;
  // setSelectedMon: (newState: number) => void;
  // searchedMon: string;
  // setSearchedMon: (newState: string) => void;
}

const initialValue = {
  isDetailsOpened: false,
  setIsDetailsOpened: () => {},
  // selectedMon: 0,
  // setSelectedMon: () => {},
  // searchedMon: '',
  // setSearchedMon: () => {}
}

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({children}: UserContextProps) => {
  const [isDetailsOpened, setIsDetailsOpened] = useState(initialValue.isDetailsOpened);

  return <UserContext.Provider value={{isDetailsOpened, setIsDetailsOpened}}>
    {children}
  </UserContext.Provider>
}