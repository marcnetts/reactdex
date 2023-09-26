import { useContext, useEffect, useState } from "react";
import styles from "./Index.module.css";
import axios from "axios";
import { UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export interface IndexProps {
  searchedMon: string,
  monData: MonDataBasic[]
}

function Index() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const {monData, setMonData} = useContext(UserContext);
  const {searchedMon} = useContext(UserContext);

  useEffect(() => {
    if(monData.length == 0)
      getAllMons()
  }, [])

  async function getAllMons() {
    setLoading(true);
    let endpoints = [];
    for (let index = 1; index <= 50; index++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    }
    
    var apiMonData: MonDataBasic[] = [];
    Promise.all(endpoints.map(endpoint => axios.get(endpoint)
      .then(response => {
        let mon = response.data as MonDataBasic;
        apiMonData.push(mon);
        setMonData([...apiMonData]);
        setLoading(false);
      })));
  }
  
  if (isLoading) {
    return <div className={styles.y_scroll}>Loading...</div>;
  }
  // const navigate = useNavigate();
  return (
    <div className={styles.y_scroll}>
      <div>{monData.length}</div>
      <div>{searchedMon}</div>
      <section className={styles.container}>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon) => {
          // return <Card {...mon} key={mon.id} />
          return (
            <div key={mon.order} className={styles.mon_container}>
              <a href={`/mon/${mon.id}`} onClick={(e) => {e.preventDefault(); window.history.replaceState("", "",`/mon/${mon.id}`);
              }} className={styles.mon_link}>
                <img src={`https://www.centropkmn.com/pokes/dream-world/${mon.id}.svg`} alt={mon.name} className={styles.mon_svg} />
                <div className={styles.mon_number}># {mon.id.toString().padStart(3, '0')}</div>
              </a>
            </div>
            )
        })}
      </section>
    </div>
  );
}

export default Index;
