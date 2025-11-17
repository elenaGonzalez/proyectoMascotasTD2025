import React, { useEffect, useState } from "react";
// ❌ IMPORTACIÓN DE NAV ES REDUNDANTE AQUÍ, PERO LA MANTENEMOS SI OTROS ARCHIVOS LA USAN:
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
import CarruselMascotas from '../component/layout/CarruselMascotas.jsx'; 

// Rutas de la API (Base de datos del back-end)
const API_URL_PUBLICACIONES = "http://localhost:3000/api/publicaciones";
const API_URL_MASCOTAS = "http://localhost:3000/api/mascotas";


function HomeNew() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);
    const [showSoporte, setShowSoporte] = useState(false);
    const [showContacto, setShowContacto] = useState(false);
    
    const [mascotasCarrusel, setMascotasCarrusel] = useState([]);
    const [loadingCarrusel, setLoadingCarrusel] = useState(true); 

    const publicaciones = useSelector((state) => state.publicaciones);
    const dispatch = useDispatch();

    // LÓGICA DE DATOS 1: Obtener publicaciones (Lógica del compañero - Redux)
    useEffect(() => {
        axios
            .get(API_URL_PUBLICACIONES)
            .then((res) => dispatch(getPublicaciones(res.data)))
            .catch((err) => console.log("Error Redux/Publicaciones:", err));
    }, [dispatch]);

    // LÓGICA DE DATOS 2: Obtener mascotas para el Carrusel (Su lógica)
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

    // 🛑 Manejo de estado de carga: Espera a que ambas fuentes de datos carguen
    if (publicaciones.length === 0 || loadingCarrusel) {
        return <div className="text-center my-5">Cargando la aplicación...</div>;
    }


    // 🚀 RENDERIZADO FINAL: Se renderizan los componentes de layout UNA SOLA VEZ
    return (
        <>
            {/* ❌ ESTE BLOQUE FUE ELIMINADO: Estaba duplicando el Navbar que viene de App.jsx */}
            {/* <NavbarMain
                onLoginClick={() => setShowLogin(true)}
                onRegistroClick={() => setShowRegistro(true)}
            />
            */}
            
            <Principal /> 
            
            {/* Su Carrusel: Se inserta aquí */}
            <CarruselMascotas mascotas={mascotasCarrusel} /> 
            
            {/* Div contenedor de las Cards (Lógica del compañero) */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                    padding: "1rem",
                }}
            >
                {/* Mapeo de Publicaciones (usa Redux) */}
                {publicaciones.map((publicacion) => (
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