import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import Publicar from "./pages/Publicar.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publicar" element={<Publicar />} />
    </Routes>
  )
}

export default App
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  