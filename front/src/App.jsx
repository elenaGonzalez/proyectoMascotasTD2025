import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; 

// Importaciones de Páginas y Componentes
import HomeNew from './pages/HomeNew.jsx'; // Nuevo Home que usa Redux
import DetallePublicacionNew from './pages/DetallePublicacionNew.jsx';
import Publicar from "./pages/Publicar.jsx";
import NavbarMain from './component/layout/Navbar.jsx'; // Navbar global
import PanelUsuarioNew from './pages/PanelUsuarioNew.jsx'; // Componente de Perfil/Panel


// El componente App es el encargado de envolver todas las rutas
export default function App() {
  return (
    <>
      {/* 1. Navbar con buscador (siempre visible) */}
      <NavbarMain />

      {/* 2. Contenido con TODAS las rutas */}
      <Routes>
        
        {/* Ruta principal (/) apunta a HomeNew */}
        <Route path="/" element={<HomeNew />} /> 
        
        {/* Rutas secundarias */}
        <Route path="/home" element={<HomeNew />} />
        <Route path="/detalle/publicacion/:id" element={<DetallePublicacionNew />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/panel/new" element={<PanelUsuarioNew />} /> 
      </Routes>
    </>
  );
}