import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNew from "./pages/HomeNew.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import DetallePublicacionNew from "./pages/DetallePublicacionNew.jsx";
import NavbarMain from './component/layout/Navbar.jsx'; // Navbar global
import Publicar from "./pages/Publicar.jsx";
import PanelUsuarioNew from "./pages/PanelUsuarioNew.jsx";
import PanelAdmin from "./pages/PanelAdmin.jsx";
import PublicacionesAdmin from "./pages/PublicacionesAdmin.jsx";
import RutaProtegidaAdmin from "./component/auth/RutaProtegidaAdmin.jsx";
import RutaProtegida from "./component/auth/RutaProtegida.jsx";


// El componente App es el encargado de envolver todas las rutas
export default function App() {
  return (
    <>
    <NavbarMain />
    <Routes>
      <Route path="/" element={<HomeNew />} />
      <Route path="/home" element={<HomeNew />} />
      <Route
        path="/detalle/publicacion/:id"
        element={<DetallePublicacionNew />}
      />
      <Route
        path="/publicar"
        element={
          <RutaProtegida>
            <Publicar />
          </RutaProtegida>
        }
      />
      <Route
        path="/panel/new"
        element={
          <RutaProtegida>
            <PanelUsuarioNew />
          </RutaProtegida>
        }
      />
      <Route
        path="/panel/admin"
        element={
          <RutaProtegidaAdmin>
            <PanelAdmin />
          </RutaProtegidaAdmin>
        }
      />
      <Route
     path="/panel/publicaciones"
     element={
       <RutaProtegidaAdmin>
          <PublicacionesAdmin />
       </RutaProtegidaAdmin>
     }
     />
    </Routes>
    </>
  );
}
