// src/component/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logoutUsuario } from "../../redux/usuarioSlice.js"; 
import { Link } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext.jsx';
import Login from '../auth/Login.jsx';
import Registro from '../auth/Registro.jsx';
import "./Navbar.css";

function NavbarMain() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);
    const { searchTerm, setSearchTerm } = useSearch(); 
    const dispatch = useDispatch();

    const savedUserId = JSON.parse(localStorage.getItem("usuario"));

    // === Estado para ocultar/mostrar navbar ===
    const [hideNavbar, setHideNavbar] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);

    // === Logout ===
    const handlerLogout = () => {
        dispatch(logoutUsuario({}));
        localStorage.removeItem("usuario");
        window.location.href = "/";
    };

    // === Detectar Scroll ===
    useEffect(() => {
        const handleScroll = () => {
            let currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 60) {
                setHideNavbar(true);     // bajar → ocultar
            } else {
                setHideNavbar(false);    // subir → mostrar
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [lastScroll]);

    return (
        <>
            <Navbar 
                expand="lg" 
                className={`custom-navbar ${hideNavbar ? "navbar-hidden" : ""}`}
            >
                <Container fluid>

                    {/* LOGO + NOMBRE */}
                    <Link to="/" className="navbar-logo">
                        <img 
                            src="/logoadopcion.png"
                            alt="Logo"
                            className="logo-img"
                        />
                        <span className="logo-text">TuAmigoFiel</span>
                    </Link>

                    <Navbar.Toggle aria-controls="menu" />

                    <Navbar.Collapse id="menu">

                        {/* Buscador */}
                        <div className="search-container d-none d-lg-block mx-lg-4">
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar mascota, ciudad, raza..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </Form>
                        </div>

                        <Nav className="ms-auto align-items-center">
                            {!savedUserId ? (
                                <>
                                    <Button
                                        variant="outline-light"
                                        className="nav-btn me-2"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        Iniciar sesión
                                    </Button>

                                    <Button
                                        variant="success"
                                        className="nav-btn"
                                        onClick={() => setShowRegistro(true)}
                                    >
                                        Registrarse
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/panel/new">
                                        <Button variant="outline-primary" className="nav-btn me-2">
                                            Perfil
                                        </Button>
                                    </Link>

                                    <Link to="/publicar">
                                        <Button variant="primary" className="nav-btn me-2">
                                            Publicar
                                        </Button>
                                    </Link>

                                    <Button variant="danger" className="nav-btn" onClick={handlerLogout}>
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Login show={showLogin} onHide={() => setShowLogin(false)} />
            <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
        </>
    );
}

export default NavbarMain;
