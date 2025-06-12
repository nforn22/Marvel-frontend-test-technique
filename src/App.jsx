import './App.css'
import Characters from './pages/Characters/Characters';
import Comics from './pages/Comics/Comics';
import Favorites from './pages/Favorites/Favorites';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
