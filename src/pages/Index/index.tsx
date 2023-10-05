import { useContext, useEffect, useState } from "react";
import styles from "./Index.module.css";
import axios from "axios";
import { UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import bg_ball from "../../img/background-ball.png";

export interface IndexProps {
  searchedMon: string,
  monData: MonDataBasic[]
}

function Index() {
  const navigate = useNavigate();
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
    for (let index = 1; index <= 649; index++) {
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
  return (
    <div className={styles.y_scroll}>
      <section className={styles.container}>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.id > b.id ? 1 : -1}).map((mon) => {
          // return <Card {...mon} key={mon.id} />
          return (
            <div key={mon.order} className={styles.mon_container} style={{backgroundImage: `url(${bg_ball})`}}>
              <a href={`/mon/${mon.id}`} onClick={(e) => {e.preventDefault(); navigate(`/mon/${mon.id}`);}} className={styles.mon_link}>
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
