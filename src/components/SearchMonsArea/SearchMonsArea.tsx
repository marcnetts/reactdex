import React, { useContext, useState } from "react";
import styles from "./SearchMonsArea.module.css";
import { UserContext } from "../../assets/contexts/UserContext";

export interface SearchMonsAreaProps {
  // prop?: string,
  // updateName: (arg: string) => void
  searchInput: string,
  setSearchedInput: (newState: string) => void;
}

// export function SearchMonsArea({ prop = "default value", updateName }: SearchMonsAreaProps) {
export function SearchMonsArea() {
  const [searchInput, setSearchInput] = useState("");
  const {searchedMon, setSearchedMon} = useContext(UserContext);
  const {monData, setMonData} = useContext(UserContext);
  
  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSearchedMon(e.target.value);
    // setSearchedMon(searchInput);
  };

  return (
    <div className={styles.SearchMonsArea}>
      <div>{searchedMon}</div>
      <input
        type="search"
        className={styles.input}
        placeholder="Search..."
        onChange={handleChange}
        value={searchedMon}
      />
      <div>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon, key) => {
            // return <Card {...mon} key={mon.id} />
            // return <div {...mon} key={mon.name}>{mon.name}</div>
            return (
              <div key={mon.order} className={styles.mon_container}>
                <a href={`/mon/${mon.id}`} className={styles.mon_link}>
                  #{mon.id.toString().padStart(3, '0')} {mon.name}
                </a>
              </div>
              )
          })}
      </div>
    </div>
  );
}
