import { useContext, useEffect, useState } from "react";
// import Banner from "../../components/Banner";
// import Card from "../../components/Card";
// import Titulo from "../../components/Titulo";
// import videos from "../../json/db.json";
import styles from "./Index.module.css";
import axios from "axios";
import { UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";

export interface IndexProps {
  searchedMon: string,
  // setSearchedMon: (newState: string) => void,
  monData: MonDataBasic[]
}

// function Index({mons}: {mons: MonData}) {
function Index() {
  const [isLoading, setLoading] = useState<boolean>(true);
  // const [monsGeneralData, setMonsGeneralData] = useState<MonDataBasic[]>([]);
  const {monData, setMonData} = useContext(UserContext);
  const {searchedMon, setSearchedMon} = useContext(UserContext);
  // const [searchInput, setSearchInput] = useState(searchedMon);
  // const searchInput = useContext(MyContext)

  useEffect(() => {
    // if(monData != monsGeneralData)
    //   setMonsGeneralData(monData);
    if(monData.length == 0)
      getAllMons()
  }, [])

  async function getAllMons() {
    setLoading(true);
    var endpoints = [];
    for (let index = 1; index < 50; index++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    }
    
    var apiMonData: MonDataBasic[] = [];
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)
      .then((response) => {
        let mon = response.data as MonDataBasic;
        apiMonData.push(mon);
        setMonData(apiMonData);
        setLoading(false);
      })));
  }
  
  if (isLoading) {
    return <div className="App">Loading... ah, {searchedMon} + {monData.length}</div>;
  }

  return (
    <div className={styles.y_scroll}>
      <div>asdasd</div>
      <div>{monData.length}</div>
      <div>{searchedMon}</div>
      {/* <Card id="1" titulo="Gato de Botas 2" capa="https://upload.wikimedia.org/wikipedia/pt/7/78/Puss_in_Boots_The_Last_Wish_poster.jpg" /> */}
      <section className={styles.container}>
        {/* {monData.sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon, key) => { */}
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon, key) => {
          // return <Card {...mon} key={mon.id} />
          // return <div {...mon} key={mon.name}>{mon.name}</div>
          return (
            <div key={mon.order} className={styles.mon_container}>
              {/* {mon.name} {mon.id} {JSON.stringify(mon.stats)} */}
              <a href={`/mon/${mon.id}`} className={styles.mon_link}>
                <img src={`https://www.centropkmn.com/pokes/dream-world/${mon.id}.svg`} alt={mon.name} className={styles.mon_svg} />
                {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${mon.order}.svg`} alt={mon.name} className={styles.mon_svg} /> */}
              </a>
              <div className={styles.mon_number}># {mon.id.toString().padStart(3, '0')}</div>
            </div>
            )
        })}
      </section>
    </div>
  );
}

export default Index;
