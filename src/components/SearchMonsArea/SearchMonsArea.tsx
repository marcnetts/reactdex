import React, { useContext } from "react";
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
  // const [searchInput, setSearchInput] = useState("");
  const {searchedMon, setSearchedMon} = useContext(UserContext);
  const {monData} = useContext(UserContext);
  
  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setSearchedMon(e.target.value);
    // setSearchedMon(searchInput);
  };

  return (
    <div className={styles.SearchMonsArea}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search..."
        onChange={handleChange}
        value={searchedMon}
      />
      <div className={styles.y_scroll + ' ' + styles.padding_top}>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon) => {
            // return <Card {...mon} key={mon.id} />
            // return <div {...mon} key={mon.name}>{mon.name}</div>
            return (
              <div key={mon.order} className={styles.mon_container}>
                <a href={`/mon/${mon.id}`} className={styles.mon_link}>
                  <div className={styles.mon_number}>#{mon.id.toString().padStart(3, '0')}</div> <div>{mon.name.charAt(0).toUpperCase() + mon.name.slice(1)}</div>
                </a>
              </div>
              )
          })}
      </div>
    </div>
  );
}
