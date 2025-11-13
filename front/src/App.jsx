import { Routes, Route } from 'react-router-dom'
//import Home from './pages/Home.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNew from './pages/HomeNew.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import DetallePublicacionNew from './pages/DetallePublicacionNew.jsx';
  

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeNew />} />
      <Route path="/detalle/publicacion/:id" element={<DetallePublicacionNew />} />
    </Routes>
  )
}

export default App
