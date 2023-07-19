import { useContext, useEffect, useState } from "react";
// import Banner from "../../components/Banner";
// import Card from "../../components/Card";
// import Titulo from "../../components/Titulo";
// import videos from "../../json/db.json";
import styles from "./Index.module.css";
import axios from "axios";
import { UserContext } from "../../assets/contexts/UserContext";
import { MonDataBasic } from "../../assets/contexts/UserContext";

interface ApiMonData{
  results: MonDataBasic[]
}
// interface MonDataBasic{
//   name: string,
//   order: number,
//   actualOrder:number
// }

function getAllMonnns() {
  // return fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  // .then((response) => response.json())
  // .then((responseJson) => {
  //   return responseJson.results as MonDataBasic[];
  // })
  // .catch((error) => {
  //   console.error(getAllMons.name, error);
  // });
}

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

  // async function getAllMonsLegacy() {
  //   axios.get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  //   .then((response) => setMonsGeneralData(response.data))
  //   .catch((err) => {
  //     console.error("monsGeneralData err: " + err);
  //   });
  // }

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
        mon.dexNumber = +(mon.sprites.other.dream_world.front_default.match(/\d+/) ?? [0])[0]
        apiMonData.push(mon);
        setMonData(apiMonData);})));
    setLoading(false);
  }
  // console.log(axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'));
  
  if (isLoading) {
    return <div className="App">Loading... ah, {searchedMon} + {monData.length}</div>;
  }

  return (
    <div>
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
            <>
            <div key={mon.order} className={styles.mon_container}>
              {mon.name} {mon.order} {mon.dexNumber} {/* {JSON.stringify(mon.stats)} */}
              <a href="" className={styles.mon_link}>
                <img src={`https://www.centropkmn.com/pokes/dream-world/${mon.dexNumber}.svg`} alt={mon.name} className={styles.mon_svg} />
                {/* <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${mon.order}.svg`} alt={mon.name} className={styles.mon_svg} /> */}
              </a>
            </div>
            </>
            )
        })}
      </section>
    </div>
  );
}

export default Index;
