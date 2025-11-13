import { Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNew from './pages/HomeNew.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import DetallePublicacionNew from './pages/DetallePublicacionNew.jsx';
  
import Publicar from "./pages/Publicar.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeNew />} />
      <Route path="/detalle/publicacion/:id" element={<DetallePublicacionNew />} />
      <Route path="/publicar" element={<Publicar />} />
    </Routes>
  )
}

export default App
