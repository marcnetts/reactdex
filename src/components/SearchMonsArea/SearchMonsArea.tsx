import React, { useContext } from "react";
import styles from "./SearchMonsArea.module.css";
import { UserContext } from "../../assets/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import search_icon from "../../img/3031293_search.png";

export interface SearchMonsAreaProps {
  // prop?: string,
  searchInput: string,
  setSearchedInput: (newState: string) => void;
}

// export function SearchMonsArea({ prop = "default value", updateName }: SearchMonsAreaProps) {
export function SearchMonsArea() {
  const navigate = useNavigate();
  const {searchedMon, setSearchedMon} = useContext(UserContext);
  const {monData} = useContext(UserContext);
  
  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSearchedMon(e.target.value);
  };

  return (
    <div className={styles.SearchMonsArea}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search..."
        onChange={handleChange}
        value={searchedMon}
        style={{backgroundImage: `url(${search_icon})`}}
      />
      <div className={styles.y_scroll + ' ' + styles.padding_top}>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon) => {
            // return <Card {...mon} key={mon.id} />
            return (
              <div key={mon.order} className={styles.mon_container}>
                <a href={`#/mon/${mon.id}`} onClick={(e) => {e.preventDefault(); navigate(`mon/${mon.id}`);}} className={styles.mon_link}>
                  <div className={styles.mon_number}>#{mon.id.toString().padStart(3, '0')}</div> <div>{mon.name.charAt(0).toUpperCase() + mon.name.slice(1)}</div>
                </a>
              </div>
              )
          })}
      </div>
    </div>
  );
}
