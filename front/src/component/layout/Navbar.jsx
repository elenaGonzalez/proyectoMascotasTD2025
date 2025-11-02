import { useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import Login from '../auth/Login.jsx'
import Registro from '../auth/Registro.jsx'

function NavbarMain() {
const [showLogin, setShowLogin] = useState(false)
const [showRegistro, setShowRegistro] = useState(false)

return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="/">Mi Proyecto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Button variant="outline-light" className="me-2" onClick={() => setShowLogin(true)}>
                Iniciar sesión
            </Button>
            <Button variant="success" onClick={() => setShowRegistro(true)}>
                Registrarse
            </Button>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

      {/* Modales */}
    <Login show={showLogin} onHide={() => setShowLogin(false)} />
    <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
    </>
)
}

export default NavbarMain
