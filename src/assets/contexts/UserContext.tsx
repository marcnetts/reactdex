import { ReactNode, createContext, useState } from "react";

type UserContextProps = {
  children: ReactNode;
}

export interface MonDataDex {
  //https://pokeapi.co/api/v2/pokemon-species/1/
  id: number,
  name: string,
  flavor_text_entries:[{
    flavor_text: string,
    language: { name:string },
    version: { name:string }
  }]
}

export interface DexDataBasic {
  [id: number]: [{
    flavor_text: string,
    language: string
  }]
}

export interface MonDataBasic{
  id: number,
  name: string,
  order: number,
  stats:[{
    base_stat: number,
    stat: { name: string }
  }],
  types:[{
    slot: number,
    type: { name: string }
  }],
  dexEntry: string
  // sprites:{
  //   other:{
  //     dream_world:{
  //       front_default: string
  //     }
  //   }
  // }
}

type UserContextType = { //not necessary for now
  monData: MonDataBasic[];
  setMonData: (newState: MonDataBasic[]) => void;
  dexData: DexDataBasic;
  setDexData: (newState: DexDataBasic) => void;
  searchedMon: string;
  setSearchedMon: (newState: string) => void;
  selectedMon: number;
  setSelectedMon: (newState: number) => void;
  isDetailsOpened: boolean;
  setIsDetailsOpened: (newState: boolean) => void;
}

const initialValue = {
  monData: [] as MonDataBasic[],
  setMonData: () => {},
  dexData: [] as DexDataBasic,
  setDexData: () => {},
  searchedMon: '',
  setSearchedMon: () => {},
  selectedMon: 0,
  setSelectedMon: () => {},
  isDetailsOpened: false,
  setIsDetailsOpened: () => {}
}

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({children}: UserContextProps) => {
  const [monData, setMonData] = useState(initialValue.monData);
  const [dexData, setDexData] = useState(initialValue.dexData);
  const [searchedMon, setSearchedMon] = useState(initialValue.searchedMon);
  const [selectedMon, setSelectedMon] = useState(initialValue.selectedMon);
  const [isDetailsOpened, setIsDetailsOpened] = useState(initialValue.isDetailsOpened);

  return <UserContext.Provider value={{monData, setMonData, dexData, setDexData, searchedMon, setSearchedMon, selectedMon, setSelectedMon, isDetailsOpened, setIsDetailsOpened}}>
    {children}
  </UserContext.Provider>
}