import './index.css';
import { useEffect } from 'react';
import Menu from './components/Menu';
import Tablero from './components/Tablero';
import useMenu from './hooks/useMenu.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

const { nivel, cargarMenu } = useMenu();

useEffect(() => {
  cargarMenu()
},[])

  return (
    <Router>
        <Link to="/">
          <div className='p-10 font-press-start text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500'>
            MENU
          </div>
        </Link>
      <Routes>
        <Route path="/" element={<Menu nivel={nivel} />} />
        <Route path="/tablero/:nivel" element={<Tablero />} />
      </Routes>  
    </Router>
  )
}

export default App
