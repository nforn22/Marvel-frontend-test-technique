import './App.css'
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import Home from './pages/Home/Home';
import CharacterComics from './pages/CharacterComics/CharacterComics';
import ComicDetail from './pages/ComicDetail/ComicDetail';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
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
