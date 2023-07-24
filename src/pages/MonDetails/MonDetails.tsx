import { useContext, useEffect, useState } from "react";
// import Banner from "../../components/Banner";
// import Card from "../../components/Card";
// import Titulo from "../../components/Titulo";
// import videos from "../../json/db.json";
import styles from "./MonDetails.module.css";
import axios from "axios";
import { MonDataDex, UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";
import { useParams } from "react-router-dom";

export interface IndexProps {
  searchedMon: string,
  // setSearchedMon: (newState: string) => void,
  monData: MonDataBasic[]
}

function MonDetails() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const {monData, setMonData} = useContext(UserContext);

  var selectedMon = monData.filter(mon => mon.id == +id!)[0];
  // const dexEntries: [{id: number }] = []

  useEffect(() => {
    console.log(selectedMon)
    console.log(!selectedMon?.dexEntry)
    if(selectedMon && !selectedMon.dexEntry){
      getDexData();
    }
  }, [])

  async function getDexData(){  
    setLoading(true);  
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((response) => {
      let dexEntry = response.data as MonDataDex;
      selectedMon.dexEntry = dexEntry.flavor_text_entries.filter(entry => entry.language.name == "en" && entry.version.name == "shield")[0].flavor_text;
      console.log("got dex data: " + selectedMon?.dexEntry);
    })
    .catch((err) => {
      console.error("getDexData err: " + err);
    });
    setLoading(false);
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div>
      <img src={`https://www.centropkmn.com/pokes/dream-world/${selectedMon?.id}.svg`} alt={selectedMon?.name} className={styles.mon_svg} />
      <div>#{selectedMon?.order.toString().padStart(3, '0')}</div>
      <div>{selectedMon?.name.charAt(0).toUpperCase() + selectedMon?.name.slice(1)}</div>
      {/* <div>{selectedMon?.stats[0]?.base_stat}</div> */}
      <div>{selectedMon?.dexEntry}</div>
      {!selectedMon ? '' : selectedMon.stats.map((stat, key) => {
        return (
          <div key={stat.stat.name}>{stat.stat.name} {stat.base_stat}</div>
        )
      })}
      <div></div>
      {/* <Card id="1" titulo="Gato de Botas 2" capa="https://upload.wikimedia.org/wikipedia/pt/7/78/Puss_in_Boots_The_Last_Wish_poster.jpg" /> */}
      {/* <section className={styles.container}>
        {monData.filter(mon => mon.name.includes(searchedMon) ).sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon, key) => {
          return (
            <>
            <div key={mon.order} className={styles.mon_container}>
              {mon.name} {mon.id}
              <a href={`/mon/${mon.id}`} className={styles.mon_link}>
                <img src={`https://www.centropkmn.com/pokes/dream-world/${mon.id}.svg`} alt={mon.name} className={styles.mon_svg} />
              </a>
            </div>
            </>
            )
        })}
      </section> */}
    </div>
  );
}

export default MonDetails;
