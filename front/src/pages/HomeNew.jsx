import React, { useState, useEffect } from "react";
// ... (Otras importaciones)
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPublicaciones } from "../redux/publicacionesSlice.js";
import CardNew from "../component/layout/CardNew.jsx";
import CarruselMascotas from "../component/layout/CarruselMascotas.jsx";
import FiltroPublicaciones from "../component/filters/FiltroPublicaciones.jsx"; // ⬅️ Nuevo componente del compañero
import { useSearch } from "../context/SearchContext.jsx"; // ⬅️ SU IMPORTACIÓN

// 🔹 Nuevo: Principal (tu componente de bienvenida)
import Principal from "../component/layout/Principal.jsx";

// 🔹 Nuevo: Footer (el que te falta ahora mismo)
import Footer from "../component/layout/Footer.jsx";

// 🔹 (Si estos no están importados todavía arriba, agregalos también con la ruta correcta)
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "./Contacto.jsx";

// Rutas de la API (Mantener ambas)
const API_URL_PUBLICACIONES = "http://localhost:3000/api/publicaciones";
const API_URL_MASCOTAS = "http://localhost:3000/api/mascotas";

// Función de normalización (Su código, para la búsqueda local)
const normalize = (text) =>
  (text ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function HomeNew() {
  // ⬅️ HOOKS DE MODAL (DE SU CÓDIGO)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);

  // ⬅️ HOOKS DE CARRUSEL (SU CÓDIGO)
  const [mascotasCarrusel, setMascotasCarrusel] = useState([]);
  const [loadingCarrusel, setLoadingCarrusel] = useState(true);

  // ⬅️ HOOKS Y ESTADOS DEL COMPAÑERO (PAGINACIÓN / FILTROS / REDUX)
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const publicaciones = useSelector((state) => state.publicaciones.rows) || []; // Usar .rows
  const total_publicaciones_BD =
    useSelector((state) => state.publicaciones.count) || 0;
  const { searchTerm } = useSearch(); // ⬅️ SU BUSCADOR

  const limit = 6;
  const totalPages = Math.ceil(total_publicaciones_BD / limit);
  const numeroPaginas = Array.from({ length: totalPages }, (_, i) => i + 1);

  // ⬅️ LÓGICA DE DATOS 1: Obtener PUBLICACIONES PAGINADAS/FILTRADAS (CÓDIGO DEL COMPAÑERO)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lógica de filtros avanzada del compañero (omite el fetch si no hay filtros)
        const noFilters = Object.values(filters).every(
          (v) => v === "" || v === null
        );

        let res;
        if (noFilters) {
          res = await axios.get(
            `http://localhost:3000/api/publicaciones/${page}/${limit}`
          );
        } else {
          res = await axios.post(
            `http://localhost:3000/api/publicaciones/${page}/${limit}/filtro`,
            filters
          );
        }
        dispatch(getPublicaciones(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, filters, dispatch]); // Dependencias: Si cambia la página o el filtro, se vuelve a cargar

  // ⬅️ LÓGICA DE DATOS 2: Obtener mascotas para el CARRUSEL (SU CÓDIGO)
  useEffect(() => {
    fetch(API_URL_MASCOTAS)
      .then((response) => response.json())
      .then((data) => {
        setMascotasCarrusel(data);
        setLoadingCarrusel(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos del carrusel:", error);
        setLoadingCarrusel(false);
      });
  }, []);

  // 🚀 LÓGICA CLAVE: APLICAR EL BUSCADOR (FILTRO LOCAL)
  // Filtra las publicaciones que YA fueron paginadas/filtradas por el backend.
  const filteredPublicaciones = publicaciones.filter((publicacion) => {
    if (!searchTerm || searchTerm.length < 2) return true;

    const q = normalize(searchTerm);
    const nombreMascota = normalize(publicacion.mascota?.nombre);
    const ciudad = normalize(publicacion.mascota?.ciudad);
    const titulo = normalize(publicacion.titulo);

    return (
      nombreMascota.includes(q) || ciudad.includes(q) || titulo.includes(q)
    );
  });

  // 🚀 RENDERIZADO FINAL: Se renderiza el contenido de la página
  return (
    <>
      {/* El NavbarMain se renderiza en App.jsx */}
      <Principal />

      {/* 2. Su Carrusel: Se inserta aquí */}
      <CarruselMascotas mascotas={mascotasCarrusel} />

      {/* Texto informativo sobre adopciones */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "10px",
          padding: "0 20px",
        }}
      >
        <h2 style={{ fontWeight: "700" }}>
          Todos estos animales en adopción necesitan una familia
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#555",
            maxWidth: "700px",
            margin: "10px auto",
          }}
        >
          Consulta la ficha de los animales en adopción para conocerlos mejor.
          <br />
          También puedes:{" "}
          <strong>Filtrar por Categoria, genero, edad y más.</strong>
        </p>
      </div>

      {/* Botón de Filtros del compañero */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          paddingRight: "90px",
        }}
      >
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="btn btn-primary"
        >
          {showFilters ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
        </button>
      </div>

      {showFilters && (
        <FiltroPublicaciones
          onChange={(newFilters) => setFilters(newFilters)}
        />
      )}

      {/* 3. Cards Paginadas/Filtradas (Muestra los datos filtrados localmente) */}
      <div
        className="row w-100 g-3"
        style={{ padding: "1rem", margin: "0 auto" }}
      >
        {filteredPublicaciones.length > 0 ? (
          filteredPublicaciones?.map((publicacion) => (
            <div
              key={publicacion.id}
              className="col-12 col-sm-6 col-lg-4 d-flex"
            >
              <CardNew
                key={publicacion.id}
                id={publicacion.id}
                titulo={publicacion.titulo}
                telefono={publicacion.telefono}
                fecha_publicacion={publicacion.fecha_publicacion}
                nombre={publicacion.mascota?.nombre}
                mascota_id={publicacion.mascotaId}
                foto={publicacion.mascota?.foto}
                ciudad={publicacion.mascota?.ciudad}
              />
            </div>
          ))
        ) : (
          <div className="text-center my-5">
            <h3>No se encontraron resultados</h3>
            <p>Prueba ajustando los filtros o la búsqueda.</p>
          </div>
        )}
      </div>

      {/* PAGINADO (Lógica del compañero) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          margin: "25px",
        }}
      >
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
              cursor: "pointer",
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

      {/* Modales */}
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
      <Soporte show={showSoporte} onHide={() => setShowSoporte(false)} />
      <Contacto show={showContacto} onHide={() => setShowContacto(false)} />
    </>
  );
}

export default HomeNew;
