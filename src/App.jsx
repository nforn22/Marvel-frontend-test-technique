import './App.css'
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import CharacterComics from './pages/CharacterComics/CharacterComics';
import ComicDetail from './pages/ComicDetail/ComicDetail';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setUserToken(token);
  }, []);

  // màj du token (connexion/déconnexion)
  const handleSetUserToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("token");
      setUserToken(null);
    }
  };

  return (
    <>
      <Header userToken={userToken} setUserToken={handleSetUserToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/characters/:characterId/comics" element={<CharacterComics />} />
        <Route path="/comics/comic/:comicId" element={<ComicDetail />} />
      </Routes>
    </>
  )
}

export default App
