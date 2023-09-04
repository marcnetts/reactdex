import { useContext, useEffect, useState } from "react";
import styles from "./MonDetails.module.css";
import axios from "axios";
import { DexDataBasic, MonDataDex, UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";
import { useParams } from "react-router-dom";
import MonType from "../../components/MonType";

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

  if (isLoading) {
    return <div className={styles.monDetails}>Loading...</div>;
  }

  return (
    <div className={styles.monDetails}>
      <div className={styles.mon_card}>
        <img src={`https://www.centropkmn.com/pokes/dream-world/${selectedMon?.id}.svg`} alt={selectedMon?.name} className={styles.mon_svg} />
        <div className={styles.max_width}>
          <div>#{selectedMon?.id.toString().padStart(3, '0')}</div>
          <div className={styles.boldtext}>{selectedMon?.name.charAt(0).toUpperCase() + selectedMon?.name.slice(1)}</div>
          <div className={styles.flexwrap}>
            {!selectedMon ? '' : selectedMon.types.map((type, key) => {
              return (
                <MonType type={type.type.name}></MonType>
                // <div key={type.type.name}>{type.type.name}</div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.flavor_text}>{dexData[+id!]?.filter(dex => dex.language == 'en')[0].flavor_text}</div>
      {!selectedMon ? '' : selectedMon.stats.map((stat, key) => {
        return (
          <div key={stat.stat.name}>{stat.stat.name} {stat.base_stat}</div>
        )
      })}
    </div>
  );
}

export default MonDetails;
