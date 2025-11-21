import { useEffect, useState } from "react";
import NavbarMain from "../component/layout/Navbar.jsx";
import Principal from "../component/layout/Principal.jsx";
import Footer from "../component/layout/Footer.jsx";
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "../pages/Contacto.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPublicaciones } from "../redux/publicacionesSlice.js";
import CardNew from "../component/layout/CardNew.jsx";
import FiltroPublicaciones from "../component/filters/FiltroPublicaciones.jsx";


function HomeNew() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const publicaciones = useSelector((state) => state.publicaciones);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const total_publicaciones_BD = useSelector((state) => state.publicaciones.count);

  const limit = 4;
  // Convertir página lógica a offset real
  const offset = (page - 1) * limit;

//calcular total de páginas
  const total = publicaciones.count || 0;
  const totalPages = Math.ceil(total_publicaciones_BD / limit);
  const numeroPaginas = Array.from({ length: totalPages }, (_, i) => i + 1);

// Estado para filtros
const [filters, setFilters] = useState({});

useEffect(() => {
  const fetchData = async () => {
    try {
      const noFilters = Object.values(filters).every(v => v === "" || v === null);

      if (noFilters) {
        const res = await axios.get(`http://localhost:3000/api/publicaciones/${page}/${limit}`);
        dispatch(getPublicaciones(res.data));
      } else {
        const res = await axios.post(
          `http://localhost:3000/api/publicaciones/${page}/${limit}/filtro`,
          filters
        );
        dispatch(getPublicaciones(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [page, filters]);


  return (
    <>
      <NavbarMain
        onLoginClick={() => setShowLogin(true)}
        onRegistroClick={() => setShowRegistro(true)}
      />
      <Principal />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          paddingRight: "90px"
        }}>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="btn btn-primary"
      >
        {showFilters ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
      </button>
      </div>

{showFilters && (
  <FiltroPublicaciones onChange={(newFilters) => setFilters(newFilters)} />
)}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {publicaciones?.rows && publicaciones.rows.map((publicacion) => (
          <CardNew
            key={publicacion.id}
            id={publicacion.id}
            titulo={publicacion.titulo}
            telefono={publicacion.telefono}
            fecha_publicacion={publicacion.fecha_publicacion}
            nombre={publicacion.mascota.nombre}
            mascota_id={publicacion.mascotaId}
            foto={publicacion.mascota.foto}
            ciudad={publicacion.mascota.ciudad}
          />
        ))}
      </div>

      {/* PAGINADO */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "25px" }}>
        {/* Botón Anterior */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        style={{ padding: "8px 15px" }}
      >
        ◀ Anterior
      </button>

  {/* Numeración de páginas */}
  {numeroPaginas.map((num) => (
    <button
      key={num}
      onClick={() => setPage(num)}
      style={{
        padding: "8px 12px",
        fontWeight: num === page ? "bold" : "normal",
        backgroundColor: num === page ? "#ddd" : "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      {num}
    </button>
  ))}

  {/* Botón Siguiente */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    style={{ padding: "8px 15px" }}
  >
    Siguiente ▶
  </button>

</div>

      <Footer
        onLoginClick={() => setShowLogin(true)}
        onRegistroClick={() => setShowRegistro(true)}
        onSoporteClick={() => setShowSoporte(true)}
        onContactoClick={() => setShowContacto(true)}
      />

      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
      <Soporte show={showSoporte} onHide={() => setShowSoporte(false)} />
      <Contacto show={showContacto} onHide={() => setShowContacto(false)} />
    </>
  );
}

export default HomeNew;
