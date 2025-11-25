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
import CarruselMascotas from '../component/layout/CarruselMascotas.jsx'; 
import FiltroPublicaciones from "../component/filters/FiltroPublicaciones.jsx";
import { useSearch } from '../context/SearchContext.jsx'; // ⬅️ RUTA CORREGIDA: SOLO sube un nivel

// Rutas de la API (Mantener ambas)
const API_URL_PUBLICACIONES = "http://localhost:3000/api/publicaciones";
const API_URL_MASCOTAS = "http://localhost:3000/api/mascotas";

// Función de normalización (Para que la búsqueda funcione sin acentos)
const normalize = (text) =>
    (text ?? '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

function HomeNew() {
    // ESTADOS DE MODAL y CARRUSEL
    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);
    const [showSoporte, setShowSoporte] = useState(false);
    const [showContacto, setShowContacto] = useState(false);
    const [mascotasCarrusel, setMascotasCarrusel] = useState([]);
    const [loadingCarrusel, setLoadingCarrusel] = useState(true); 

    // HOOKS Y ESTADOS DEL COMPAÑERO (PAGINACIÓN / FILTROS / REDUX)
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    
    const dispatch = useDispatch();
    const publicaciones = useSelector((state) => state.publicaciones.rows) || [];
    const total_publicaciones_BD = useSelector((state) => state.publicaciones.count) || 0;
    
    const { searchTerm } = useSearch(); // ⬅️ OBTENER EL TÉRMINO DE BÚSQUEDA

    const limit = 6;
    const totalPages = Math.ceil(total_publicaciones_BD / limit);
    const numeroPaginas = Array.from({ length: totalPages }, (_, i) => i + 1);

    // LÓGICA DE DATOS 1: Obtener PUBLICACIONES PAGINADAS/FILTRADAS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentFilters = { 
                    ...filters, 
                    searchTerm: searchTerm || "",
                };

                const hasActiveFiltersOrSearch = Object.values(currentFilters).some(v => v !== "" && v !== null);

                let res;
                if (!hasActiveFiltersOrSearch) {
                     res = await axios.get(`http://localhost:3000/api/publicaciones/${page}/${limit}`);
                } else {
                     res = await axios.post(
                       `http://localhost:3000/api/publicaciones/${page}/${limit}/filtro`,
                       currentFilters
                     );
                }
                dispatch(getPublicaciones(res.data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [page, filters, searchTerm, dispatch]); 

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

    // 🚀 LÓGICA CLAVE: APLICAR EL BUSCADOR (FILTRO LOCAL)
    const filteredPublicaciones = publicaciones.filter(publicacion => {
        if (!searchTerm || searchTerm.length < 2) return true; 

        const q = normalize(searchTerm);
        const nombreMascota = normalize(publicacion.mascota?.nombre);
        const ciudad = normalize(publicacion.mascota?.ciudad);
        const titulo = normalize(publicacion.titulo);

        return nombreMascota.includes(q) || ciudad.includes(q) || titulo.includes(q);
    });

    // 🛑 Manejo de estado de carga
    if (publicaciones.length === 0 || loadingCarrusel) {
        return <div className="text-center my-5">Cargando la aplicación...</div>;
    }


    // 🚀 RENDERIZADO FINAL: Se renderiza el contenido de la página
    return (
        <>
            <Principal /> 
            
            {/* Botón de Filtros del compañero */}
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
            
            {/* 2. Su Carrusel: Se inserta aquí */}
            <CarruselMascotas mascotas={mascotasCarrusel} /> 
            
            {/* 3. Cards Paginaadas/Filtradas (Muestra los datos filtrados localmente) */}
            <div className="row w-100 g-3" style={{ padding: "1rem", margin: "0 auto" }}>

                {filteredPublicaciones.map((publicacion) => (
                    <div key={publicacion.id} className="col-12 col-sm-6 col-lg-4 d-flex">
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
                ))}
            </div>

            {/* PAGINADO (Lógica del compañero) */}
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "25px" }}>
                {/* Botón Anterior */}
                <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ padding: "8px 15px" }}>
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
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ padding: "8px 15px" }}>
                    Siguiente ▶
                </button>
            </div>

            <Footer
                onLoginClick={() => setShowLogin(true)}
                onRegistroClick={() => setShowLogin(true)}
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