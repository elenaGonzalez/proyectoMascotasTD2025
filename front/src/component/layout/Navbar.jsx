// src/component/layout/Navbar.jsx
import { useState } from 'react';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
// Importaciones de Modales (Asumiendo que estos archivos existen)
import Login from '../auth/Login.jsx';
import Registro from '../auth/Registro.jsx';
// ⬅️ CRÍTICO: Asegúrese de que este archivo exista en la ruta correcta
import { useSearch } from '../../context/SearchContext.jsx'; 

function NavbarMain() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  // Lógica para el buscador
  const { searchTerm, setSearchTerm } = useSearch(); 

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
        <Container>
          {/* Brand/Logo */}
          <Navbar.Brand href="/">Mi Proyecto</Navbar.Brand>

          {/* 🔎 Buscador (MANTENEMOS ESTA FUNCIONALIDAD) */}
          <div className="flex-grow-1 mx-3" style={{ maxWidth: 700 }}>
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

          {/* Toggle + acciones a la derecha */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {/* Botones de Login y Registro */}
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modales que se abren con los botones */}
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
    </>
  );
}

export default NavbarMain;