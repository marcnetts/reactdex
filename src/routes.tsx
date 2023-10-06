import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer, SearchMonsArea } from "./components";
import Container from "./components/Container";
import Index from "./pages/Index";
import { UserContextProvider } from "./assets/contexts/UserContext";
import MonDetails from "./pages/MonDetails/MonDetails";

function AppRoutes() {

  return (
    <HashRouter>
      <Header />
      <Container>
        <UserContextProvider>
          <SearchMonsArea></SearchMonsArea>
          <Index />
            <Routes>
              <Route path="/" element={<></>}></Route>
              <Route path="/mon/:id" element={<MonDetails />}></Route>
            </Routes>
          </UserContextProvider>
        </Container>
      <Footer />
    </HashRouter>
  );
}

export default AppRoutes;
