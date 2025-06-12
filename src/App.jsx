import './App.css'
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import CharacterComics from './pages/CharacterComics/CharacterComics';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters search={search} />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/characters/:characterId/comics" element={<CharacterComics />} />
      </Routes>
    </>
  )
}

export default App
