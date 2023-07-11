import React, { useState } from "react";

import styles from "./SearchArea.module.css";

export interface SearchAreaProps {
  prop?: string;
}

export function SearchArea({ prop = "default value" }: SearchAreaProps) {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.SearchArea}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
      />
      <br></br>
      {prop} {searchInput}
    </div>
  );
}
