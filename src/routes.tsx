import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer, SearchMonsArea } from "./components";
import Container from "./components/Container";
import Index from "./pages/Index";
import { useEffect, useState } from "react";
import axios from "axios";

interface MonDataBasic{
  name: string,
  order: number,
}

function AppRoutes() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>();
  const [monsGeneralData, setMonsGeneralData] = useState<MonDataBasic[]>([]);
  
  const updateSearchedMon = (name: string):void => {
    setSearchInput(name)
  }
  
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

  useEffect(() => {
    if(!monsGeneralData.length)
      getAllMons();
  }, [])
  
  return (
    <BrowserRouter>
      <Header />
      <Container>
        {/* <FavoritosProvider> */}
          <SearchMonsArea updateName={updateSearchedMon}></SearchMonsArea>
          <div>{searchInput}</div>
          <div>{monsGeneralData.length}</div>
          <Routes>
            <Route path="/" element={<Index monData={monsGeneralData} />}></Route>
            {/* <Route path="/favoritos" element={<Favoritos />}></Route> */}
          </Routes>
        {/* </FavoritosProvider> */}
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
