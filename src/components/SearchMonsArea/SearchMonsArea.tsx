import React, { useState } from "react";
import styles from "./SearchMonsArea.module.css";

export interface SearchMonsAreaProps {
  prop?: string,
  updateName: (arg: string) => void
}

export function SearchMonsArea({ prop = "default value", updateName }: SearchMonsAreaProps) {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    updateName(searchInput);
  };

  return (
    <div className={styles.SearchMonsArea}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}
