import { Fragment, useContext, useEffect, useState } from "react";
import styles from "./MonDetails.module.css";
import axios from "axios";
import { DexDataBasic, MonDataDex, UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";
import { useParams } from "react-router-dom";
import MonType from "../../components/MonType";
import ProgressBar from "../../components/ProgressBar";

export interface IndexProps {
  searchedMon: string,
  // setSearchedMon: (newState: string) => void,
  monData: MonDataBasic[]
}

function MonDetails() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const {monData, setMonData} = useContext(UserContext);
  const {dexData, setDexData} = useContext(UserContext);

  var selectedMon = monData.filter(mon => mon.id == +id!)[0];
  // const dexEntries: [{id: number }] = []

  useEffect(() => {
    if(!dexData[+id!]){
      getDexData();
    }
  }, [])

  async function getDexData(){
    setLoading(true);  
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((response) => {
      dexData[+id!] = [{ flavor_text: '', language: '' }];
      dexData[+id!].pop();
      (response.data as MonDataDex).flavor_text_entries.forEach(dex => {
        if(dex.version.name == 'shield')
          dexData[+id!].push({flavor_text: dex.flavor_text.replace('\n', ' '), language: dex.language.name})
      });
      setDexData(dexData);
    })
    .catch((err) => {
      console.error("getDexData err: " + err);
    });
    setLoading(false);
  }

  const _displayed_stats = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
  }

  if (isLoading) {
    return <div className={styles.monDetails}>Loading...</div>;
  }

  return (
    <div className={styles.monDetails}>
      <div className={styles.mon_card}>
        <div className={styles.mon_svg_div}>
          <img src={`https://www.centropkmn.com/pokes/dream-world/${selectedMon?.id}.svg`} alt={selectedMon?.name} />
        </div>
        <div className={styles.max_width}>
          <div>#{selectedMon?.id.toString().padStart(3, '0')}</div>
          <div className={styles.boldtext}>{selectedMon?.name.charAt(0).toUpperCase() + selectedMon?.name.slice(1)}</div>
          <div>
            {!selectedMon ? '' : selectedMon.types.map((type, key) => {
              return (
                <MonType key={type.type.name} type={type.type.name}></MonType>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.flavor_text}>{dexData[+id!]?.filter(dex => dex.language == 'en')[0].flavor_text}</div>
      <div className={styles.stats_grid}>
        {!selectedMon ? '' : selectedMon.stats.map((stat, key) => {
          return (
            <Fragment key={stat.stat.name}>
              <div className={styles.stat_name}>{_displayed_stats[stat.stat.name as keyof object]}</div>
              <div className={styles.stat_bar}>
                <ProgressBar progress={stat.base_stat/2.55} color="#3A94E7" />
              </div>
            </Fragment>
            // <div key={stat.stat.name} className={styles.stat_container}>
            //   <div className={styles.stat_name}>{_displayed_stats[stat.stat.name as keyof object]}</div>
            //   <div className={styles.stat_bar}>
            //     <ProgressBar progress={stat.base_stat/2.55} color="#3A94E7" />
            //   </div>
            // </div>
          )
        })}
      </div>
    </div>
  );
}

export default MonDetails;
