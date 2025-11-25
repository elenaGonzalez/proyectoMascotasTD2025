// src/component/layout/Navbar.jsx
import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';

// Autenticación/Redux (Código del compañero)
import { useDispatch, useSelector } from 'react-redux';
import { logoutUsuario } from "../../redux/usuarioSlice.js"; 
import { Link } from 'react-router-dom';

// Búsqueda (su código original)
import { useSearch } from '../../context/SearchContext.jsx'; 

// Modales
import Login from '../auth/Login.jsx';
import Registro from '../auth/Registro.jsx';

function NavbarMain() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegistro, setShowRegistro] = useState(false);

    // Buscador
    const { searchTerm, setSearchTerm } = useSearch(); 
    
    // Autenticación
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.usuario);

    // Persistencia LocalStorage (código del compañero)
    const savedUserId = JSON.parse(localStorage.getItem('usuario'));
    const savedUserToken = JSON.parse(localStorage.getItem('token'));

    const refreshPage = () => {
        window.location.reload(false);
    };

    const handlerLogout = () => {
        dispatch(logoutUsuario({}));
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        window.location.href = "/"; 
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>

                    {/* Marca / Logo */}
                    <Link to="/"><Navbar.Brand>Mi Proyecto</Navbar.Brand></Link>

                    {/* Buscador */}
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

                            {/* NO LOGUEADO */}
                            {!savedUserId ? (
                                <>
                                    <Button 
                                        variant="outline-light" 
                                        className="me-2 mt-2 mt-lg-0"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        Iniciar sesión
                                    </Button>

                                    <Button 
                                        variant="success" 
                                        className="mt-2 mt-lg-0"
                                        onClick={() => setShowRegistro(true)}
                                    >
                                        Registrarse
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {/* Perfil */}
                                    <Button 
                                        as={Link} 
                                        to="/panel/new" 
                                        variant="primary" 
                                        className="me-2"
                                    >
                                        Perfil
                                    </Button>

                                    {/* Publicar */}
                                    <Link to="/publicar">
                                        <Button 
                                            variant="primary" 
                                            className="me-2"
                                        >
                                            Publicar
                                        </Button>
                                    </Link>

                                    {/* Logout */}
                                    <Button 
                                        variant="danger"
                                        onClick={handlerLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modales */}
            <Login 
                show={showLogin} 
                onHide={() => setShowLogin(false)} 
            />

            <Registro 
                show={showRegistro} 
                onHide={() => setShowRegistro(false)} 
            />
        </>
    );
}

export default NavbarMain;
