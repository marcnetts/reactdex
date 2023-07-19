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
    </div>
  );
}
