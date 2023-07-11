import { useEffect, useState } from "react";
// import Banner from "../../components/Banner";
// import Card from "../../components/Card";
// import Titulo from "../../components/Titulo";
// import videos from "../../json/db.json";
import styles from "./Index.module.css";
import axios from "axios";

interface ApiMonData{
  results: MonDataBasic[]
}
interface MonDataBasic{
  name: string,
  order: number,
}

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
  monData: MonDataBasic[]
}

// function Index({mons}: {mons: MonData}) {
function Index({monData}: IndexProps) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [monsGeneralData, setMonsGeneralData] = useState<MonDataBasic[]>([]);
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    if(monData != monsGeneralData)
      setMonsGeneralData(monData);
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
        apiMonData.push(response.data);
        setMonsGeneralData(apiMonData);})));
    setLoading(false);
  }
  // console.log(axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'));
  
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div>
      <div>{monsGeneralData.length}</div>
      {/* <Banner imagem="home"></Banner>
      <Titulo>
        <h1>Um lugar para guardar seus vídeos e filmes!</h1>
      </Titulo> */}
      {/* <div className="conteudo">
        <h1>Hola mundo! Estou em uma página nova :0</h1>
      </div> */}
      {/* <Card id="1" titulo="Gato de Botas 2" capa="https://upload.wikimedia.org/wikipedia/pt/7/78/Puss_in_Boots_The_Last_Wish_poster.jpg" /> */}
      <section className={styles.container}>
        {monsGeneralData.sort((a, b) => {return a.order > b.order ? 1 : -1}).map((mon, key) => {
          // return <Card {...mon} key={mon.id} />
          // return <div {...mon} key={mon.name}>{mon.name}</div>
          return (
            <div key={mon.order} className={styles.mon_container}>
              {/* {mon.name} */}
              <a href="" className={styles.mon_link}>
              <img src={`https://www.centropkmn.com/pokes/dream-world/${mon.order}.svg`} alt={mon.name} className={styles.mon_svg} />
              </a>
            </div>
            )
        })}
      </section>
    </div>
  );
}

export default Index;
