import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Se importa una sola vez

// Importaciones de Páginas y Componentes
import HomeNew from './pages/HomeNew.jsx';
import DetallePublicacionNew from './pages/DetallePublicacionNew.jsx';
import Publicar from "./pages/Publicar.jsx";
import NavbarMain from './component/layout/Navbar.jsx';
import Home from './pages/Home.jsx'; // Ruta original de Home

// El componente App es el encargado de envolver todas las rutas
export default function App() {
  return (
    <>
      {/* Navbar con buscador (siempre visible) */}
      <NavbarMain />

      {/* Contenido con TODAS las rutas */}
      {/* ⬅️ Aquí incluimos las rutas Home, Detalle y Publicar ⬅️ */}
      <Routes>
        {/* 1. Ruta principal de la aplicación */}
        <Route path="/" element={<Home />} /> 
        
        {/* 2. Rutas del proyecto que estaban flotando */}
        <Route path="/home" element={<HomeNew />} />
        <Route path="/detalle/publicacion/:id" element={<DetallePublicacionNew />} />
        <Route path="/publicar" element={<Publicar />} />
      </Routes>
    </>
  );
}

// ⬅️ Se eliminó la doble definición y exportación que causaba el error.