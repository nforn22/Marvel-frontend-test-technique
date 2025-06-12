import './App.css'
import Characters from './pages/Characters/Characters';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/characters" element={<Characters />} />
      </Routes>
    </>
  )
}

export default App
