// src/component/layout/Navbar.jsx

import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
// Autenticación/Redux
import { useDispatch, useSelector } from 'react-redux';
import { logoutUsuario } from "../../redux/usuarioSlice.js"; 
// Búsqueda
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

  const handlerLogout = () => {
    dispatch(logoutUsuario({}));
    console.log("En logout ", usuario.nombre);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container fluid> {/* Usamos Container fluid para un mejor layout */}
          
          {/* Brand/Logo */}
          <Navbar.Brand href="/">Mi Proyecto</Navbar.Brand>
          
          {/* 🔎 Buscador (Su componente) */}
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
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ms-auto">
              
              {/* LÓGICA CONDICIONAL DE AUTENTICACIÓN (Código del compañero) */}
              { !usuario.nombre ? 
                (
                  // Estado: No Logueado (Muestra Botones Login/Registro)
                  <>
                    <Button variant="outline-light" className="me-2 mt-2 mt-lg-0" onClick={() => setShowLogin(true)}>Iniciar sesión</Button>
                    <Button variant="success" className="mt-2 mt-lg-0" onClick={() => setShowRegistro(true)}>Registrarse</Button>
                  </>
                )
                : 
                (
                  // Estado: Logueado (Muestra Botón Perfil/Logout)
                  <>
                    <Button variant='primary' className="me-2">Perfil {usuario.nombre}</Button>
                    <Button variant='danger' onClick={handlerLogout}>Logout</Button>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modales */}
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
    </>
  );
}

export default NavbarMain;