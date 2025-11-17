import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 

// Importaciones de Páginas y Componentes
import HomeNew from './pages/HomeNew.jsx'; // Este es el componente que vamos a usar
import DetallePublicacionNew from './pages/DetallePublicacionNew.jsx';
import Publicar from "./pages/Publicar.jsx";
import NavbarMain from './component/layout/Navbar.jsx';
// ❌ ELIMINAR LA LÍNEA: import Home from './pages/Home.jsx'; 

// El componente App es el encargado de envolver todas las rutas
export default function App() {
  return (
    <>
      {/* Navbar con buscador (siempre visible) */}
      <NavbarMain />

      {/* Contenido con TODAS las rutas */}
      <Routes>
        
        {/* ⬅️ CRÍTICO: CAMBIAR Home por HomeNew para la ruta principal (/) ⬅️ */}
        <Route path="/" element={<HomeNew />} /> 
        
        {/* 2. Rutas secundarias (Manteniendo HomeNew para la ruta /home si existe) */}
        <Route path="/home" element={<HomeNew />} />
        <Route path="/detalle/publicacion/:id" element={<DetallePublicacionNew />} />
        <Route path="/publicar" element={<Publicar />} />
      </Routes>
    </>
  );
}