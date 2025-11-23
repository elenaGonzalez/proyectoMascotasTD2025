// src/component/layout/Navbar.jsx
import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
// Autenticación/Redux (Código del compañero)
import { useDispatch, useSelector } from 'react-redux';
import { logoutUsuario } from "../../redux/usuarioSlice.js"; 
import { Link } from 'react-router-dom' // Para navegar sin recargar
// Búsqueda (Su código)
import { useSearch } from '../../context/SearchContext.jsx'; 
// Modales
import Login from '../auth/Login.jsx';
import Registro from '../auth/Registro.jsx';


function NavbarMain() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);

    // Lógica del BUSCADOR (Su código)
    const { searchTerm, setSearchTerm } = useSearch(); 
    
    // Lógica de AUTENTICACIÓN (Código del compañero)
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);
    // Usa LocalStorage para persistir el login (método del compañero)
    const savedUserId = JSON.parse(localStorage.getItem('usuario'));

    const refreshPage = () => {
        window.location.reload(false);
    };

    const handlerLogout = () => {
        dispatch(logoutUsuario({}));
        localStorage.removeItem('usuario');
        refreshPage();
        // Redirecciona a la página principal después del logout
        window.location.href = "/"; 
    }
    
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    {/* Brand/Logo usando Link de React Router */}
                    <Link to={`/`}><Navbar.Brand>Mi Proyecto</Navbar.Brand></Link>

                    {/* 🔎 Buscador (Su componente, inyectado después del Brand) */}
                    <div className="flex-grow-1 mx-3 d-none d-lg-block" style={{ maxWidth: 700 }}>
                        <Form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                            <Form.Control
                                type="search"
                                placeholder="Buscar mascota, ciudad, raza..."
                                aria-label="Buscar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form>
                    </div>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            
                            {/* LÓGICA CONDICIONAL DE AUTENTICACIÓN: Si NO hay usuario logueado */}
                            {!savedUserId ?
                                (
                                    <>
                                        <Button variant="outline-light" className="me-2 mt-2 mt-lg-0" onClick={() => setShowLogin(true)}>Iniciar sesión</Button>
                                        <Button variant="success" className="mt-2 mt-lg-0" onClick={() => setShowRegistro(true)}>Registrarse</Button>
                                    </>
                                )
                                : 
                                (
                                    // Lógica SI está logueado: Muestra Perfil, Publicar y Logout
                                    <>
                                        {/* Botón Perfil (Redirecciona a /panel/new según código del compañero) */}
                                        <Button as={Link} to="/panel/new" variant='primary' className="me-2">Perfil</Button>
                                        
                                        {/* Botón Publicar (Redirecciona a /publicar) */}
                                        <Link to={`/publicar`}><Button variant='primary' className="me-2">Publicar</Button></Link>
                                        
                                        {/* Botón Logout */}
                                        <Button variant='danger' onClick={() => handlerLogout()}>Logout</Button>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container fluid>
            </Navbar>

            {/* Modales */}
            <Login show={showLogin} onHide={() => setShowLogin(false)} />
            <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
        </>
    )
}

export default NavbarMain;