import { CatalogPage } from "../../pages/CatalogPage";
import { HomePage } from "../../pages/HomePage";
import { LinkCategoryPage } from "../../pages/LinkCategoryPage";
import { LinksPage } from "../../pages/LinksPage";
import { LoginPage } from "../../pages/LoginPage";
import { NewsPage } from "../../pages/NewsPage";
import { Layout } from "../Layout/Layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} /> 
        <Route path="/news" element={<NewsPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/links" element={<LinksPage/>}/>
        <Route path="/links/:category" element={<LinkCategoryPage />} />
        <Route path="/catalog" element={<CatalogPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
