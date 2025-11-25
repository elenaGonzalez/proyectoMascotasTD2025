import React, { useState, useEffect } from "react";
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
import CarruselMascotas from "../component/layout/CarruselMascotas.jsx";
import FiltroPublicaciones from "../component/filters/FiltroPublicaciones.jsx";
import { useSearch } from "../context/SearchContext.jsx";

// Rutas de la API (Mantener ambas)
const API_URL_PUBLICACIONES = "http://localhost:3000/api/publicaciones";
const API_URL_MASCOTAS = "http://localhost:3000/api/mascotas";

// Función de normalización (para búsqueda sin acentos)
const normalize = (text) =>
  (text ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function HomeNew() {
  // ESTADOS DE MODAL y CARRUSEL
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);
  const [mascotasCarrusel, setMascotasCarrusel] = useState([]);
  const [loadingCarrusel, setLoadingCarrusel] = useState(true);

  // PAGINACIÓN / FILTROS / REDUX
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const publicaciones = useSelector((state) => state.publicaciones.rows) || [];
  const total_publicaciones_BD =
    useSelector((state) => state.publicaciones.count) || 0;

  const { searchTerm } = useSearch(); // término del buscador global

  const limit = 6;
  const totalPages = Math.ceil(total_publicaciones_BD / limit);
  const numeroPaginas = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 👉 NUEVO: estados para la búsqueda global
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const isSearching = searchTerm && searchTerm.length >= 2;

  // LÓGICA DE DATOS 1: Obtener PUBLICACIONES PAGINADAS/FILTRADAS (modo normal)
  useEffect(() => {
    // Si estamos buscando globalmente, dejamos que esta parte siga solo para mantener Redux,
    // pero la lista que se muestra será searchResults cuando isSearching === true
    const fetchData = async () => {
      try {
        const currentFilters = {
          ...filters,
          // 👇 Ojo: acá ya NO dependemos de que el backend use searchTerm
          // searchTerm: searchTerm || "",
        };

        const hasActiveFilters = Object.values(currentFilters).some(
          (v) => v !== "" && v !== null
        );

        let res;
        if (!hasActiveFilters) {
          res = await axios.get(
            `${API_URL_PUBLICACIONES}/${page}/${limit}`
          );
        } else {
          res = await axios.post(
            `${API_URL_PUBLICACIONES}/${page}/${limit}/filtro`,
            currentFilters
          );
        }
        dispatch(getPublicaciones(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, filters, dispatch]); // 👈 ya no depende de searchTerm

  // LÓGICA DE DATOS 2: Obtener mascotas para el CARRUSEL
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

  // 🚀 NUEVO: BÚSQUEDA GLOBAL SOLO DESDE EL FRONT
  useEffect(() => {
    // Si no hay búsqueda o es muy corta, limpiamos resultados y listo
    if (!isSearching) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }

    const fetchAllAndFilter = async () => {
      try {
        setSearchLoading(true);

        // 1️⃣ Traemos la primera página para saber cuántas hay
        const firstRes = await axios.get(
          `${API_URL_PUBLICACIONES}/1/${limit}`
        );
        const { rows: firstRows, count } = firstRes.data;

        let all = [...firstRows];
        const totalPagesFromServer = Math.ceil(count / limit);

        // 2️⃣ Traemos el resto de las páginas
        for (let p = 2; p <= totalPagesFromServer; p++) {
          const resp = await axios.get(
            `${API_URL_PUBLICACIONES}/${p}/${limit}`
          );
          all = all.concat(resp.data.rows);
        }

        // 3️⃣ Filtramos localmente todas las publicaciones
        const q = normalize(searchTerm);
        const filtered = all.filter((publicacion) => {
          const nombreMascota = normalize(publicacion.mascota?.nombre);
          const ciudad = normalize(publicacion.mascota?.ciudad);
          const titulo = normalize(publicacion.titulo);

          return (
            nombreMascota.includes(q) ||
            ciudad.includes(q) ||
            titulo.includes(q)
          );
        });

        setSearchResults(filtered);
      } catch (err) {
        console.log("Error en búsqueda global:", err);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchAllAndFilter();
  }, [isSearching, searchTerm]); // se ejecuta cuando cambia el texto del buscador

  // 🛑 Manejo de estado de carga
  if ((publicaciones.length === 0 && !isSearching) || loadingCarrusel) {
    return <div className="text-center my-5">Cargando la aplicación...</div>;
  }

  // 👀 Lista que se va a renderizar:
  // - si hay búsqueda (isSearching) y ya tenemos resultados ⇒ usamos searchResults
  // - si no hay búsqueda ⇒ usamos las publicaciones paginadas normales
  const listToRender =
    isSearching && !searchLoading && searchResults !== null
      ? searchResults
      : !isSearching
      ? publicaciones
      : []; // mientras está cargando la búsqueda, mostramos vacío o un loader

  // 🚀 RENDERIZADO FINAL
  return (
    <>
      <Principal />

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
        <FiltroPublicaciones onChange={(newFilters) => setFilters(newFilters)} />
      )}

      {/* Carrusel */}
      <CarruselMascotas mascotas={mascotasCarrusel} />

      {/* Texto informativo */}
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

      {/* Si estamos buscando, mostrar estado de búsqueda */}
      {isSearching && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {searchLoading ? (
            <span>Buscando coincidencias para &quot;{searchTerm}&quot;...</span>
          ) : (
            <span>
              Mostrando {listToRender.length} resultado
              {listToRender.length !== 1 && "s"} para &quot;{searchTerm}&quot;
            </span>
          )}
        </div>
      )}

      {/* Cards (paginadas en modo normal, todas juntas en modo búsqueda) */}
      <div
        className="row w-100 g-3"
        style={{ padding: "1rem", margin: "0 auto" }}
      >
        {listToRender.map((publicacion) => (
          <div
            key={publicacion.id}
            className="col-12 col-sm-6 col-lg-4 d-flex"
          >
            <CardNew
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
        ))}
      </div>

      {/* PAGINADO: solo se muestra cuando NO hay búsqueda */}
      {!isSearching && (
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
      )}

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
