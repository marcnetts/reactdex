import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer, SearchArea } from "./components";
import Container from "./components/Container";
import Index from "./pages/Index";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        {/* <FavoritosProvider> */}
          <SearchArea></SearchArea>
          <Routes>
            <></>
            <Route path="/" element={<Index />}></Route>
            {/* <Route path="/favoritos" element={<Favoritos />}></Route> */}
          </Routes>
        {/* </FavoritosProvider> */}
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
