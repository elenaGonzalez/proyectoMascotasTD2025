// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// ⬇️ Asegurate de que esta ruta coincida con tu estructura real
import NavbarMain from './component/layout/Navbar.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <>
      {/* Navbar con buscador (siempre visible) */}
      <NavbarMain />

      {/* Contenido con rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
