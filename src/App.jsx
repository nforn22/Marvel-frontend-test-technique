import './App.css'
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import CharacterComics from './pages/CharacterComics/CharacterComics';
import ComicDetail from './pages/ComicDetail/ComicDetail';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { useState } from 'react';

function App() {
  const [searchCharacters, setSearchCharacters] = useState("");
  const [searchComics, setSearchComics] = useState("");
  const location = useLocation();

  const handleSearch = (value) => {
    if (location.pathname.startsWith("/characters")) {
      setSearchCharacters(value);
    } else if (location.pathname.startsWith("/comics")) {
      setSearchComics(value);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters search={searchCharacters} />} />
        <Route path="/comics" element={<Comics search={searchComics} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/characters/:characterId/comics" element={<CharacterComics />} />
        <Route path="/comics/comic/:comicId" element={<ComicDetail />} />
      </Routes>
    </>
  )
}

export default App
