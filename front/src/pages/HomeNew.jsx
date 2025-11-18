import React, { useEffect, useState } from "react";
import NavbarMain from "../component/layout/Navbar.jsx"; // Lo mantengo por si otros archivos lo usan
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
import { useSearch } from '../context/SearchContext.jsx'; // ⬅️ IMPORTACIÓN CLAVE

// Rutas de la API
const API_URL_PUBLICACIONES = "http://localhost:3000/api/publicaciones";
const API_URL_MASCOTAS = "http://localhost:3000/api/mascotas";

// Función de normalización (para que la búsqueda funcione sin acentos)
const normalize = (text) =>
    (text ?? '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

function HomeNew() {
    // ESTADOS GLOBALES (Redux)
    const publicaciones = useSelector((state) => state.publicaciones);
    const dispatch = useDispatch();

    // ESTADOS DE MODAL y CARRUSEL (Su lógica)
    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);
    const [showSoporte, setShowSoporte] = useState(false);
    const [showContacto, setShowContacto] = useState(false);
    const [mascotasCarrusel, setMascotasCarrusel] = useState([]);
    const [loadingCarrusel, setLoadingCarrusel] = useState(true); 
    
    // ⬅️ OBTENER EL TÉRMINO DE BÚSQUEDA DEL NAVBAR
    const { searchTerm } = useSearch(); 

    // LÓGICA DE DATOS 1: Obtener publicaciones (Redux)
    useEffect(() => {
        axios
            .get(API_URL_PUBLICACIONES)
            .then((res) => dispatch(getPublicaciones(res.data)))
            .catch((err) => console.log("Error Redux/Publicaciones:", err));
    }, [dispatch]);

    // LÓGICA DE DATOS 2: Obtener mascotas para el Carrusel (Fetch)
    useEffect(() => {
        fetch(API_URL_MASCOTAS)
            .then((response) => response.json())
            .then((data) => {
                setMascotasCarrusel(data);
                setLoadingCarrusel(false);
            })
            .catch(error => {
                console.error("Error al obtener datos del carrusel:", error);
                setLoadingCarrusel(false);
            });
    }, []);

    // 🚀 LÓGICA CLAVE: Filtrar las publicaciones antes de renderizar
    const filteredPublicaciones = publicaciones.filter(publicacion => {
        // Muestra todo si el término de búsqueda está vacío o es muy corto
        if (!searchTerm || searchTerm.length < 2) return true; 

        const q = normalize(searchTerm);
        // El back-end anida los datos, por lo que buscamos en mascota.nombre y ciudad.
        const nombreMascota = normalize(publicacion.mascota?.nombre);
        const ciudad = normalize(publicacion.mascota?.ciudad);
        const titulo = normalize(publicacion.titulo);

        return nombreMascota.includes(q) || ciudad.includes(q) || titulo.includes(q);
    });

    // 🛑 Manejo de estado de carga: Espera a que ambas fuentes de datos carguen
    if (publicaciones.length === 0 || loadingCarrusel) {
        return <div className="text-center my-5">Cargando la aplicación...</div>;
    }


    // 🚀 RENDERIZADO FINAL: Se renderiza el contenido de la página
    return (
        <>
            {/* 1. Navbar: Se renderiza desde App.jsx, aquí solo manejamos los modales si es necesario */}
            {/* El Navbar se mantiene aquí para que las funciones de modal puedan usarse,
                pero debe estar comentado en el return principal. */}
            
            <Principal /> 
            
            {/* 2. Su Carrusel: Se inserta aquí */}
            <CarruselMascotas mascotas={mascotasCarrusel} /> 
            
            {/* 3. Div contenedor de las Cards (Muestra los datos filtrados) */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                {/* ⬅️ CRÍTICO: Mapeo del arreglo FILTRADO ⬅️ */}
                {filteredPublicaciones.map((publicacion) => (
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
                ))}
                
                {/* Mensaje de no encontrado si el filtro es estricto */}
                {searchTerm && filteredPublicaciones.length === 0 && (
                    <div className="text-center my-4">
                        <p>No se encontraron resultados para "{searchTerm}".</p>
                    </div>
                )}
            </div>
            
            {/* Footer y Modales: Se renderizan una sola vez */}
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