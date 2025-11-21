import { useState } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import Login from '../auth/Login.jsx'
import Registro from '../auth/Registro.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUsuario } from "../../redux/usuarioSlice.js";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function NavbarMain() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegistro, setShowRegistro] = useState(false)

    const dispatch = useDispatch();
    // const usuario = useSelector((state) => state.usuario);

    const savedUserId = JSON.parse(localStorage.getItem('usuario'));

const refreshPage = () => {
    window.location.reload(false); // 'false' reloads from cache, 'true' forces a full refresh from the server
};

    const handlerLogout = () => {
        dispatch(logoutUsuario({}));
        localStorage.removeItem('usuario');
        console.log("En logout ", savedUserId);
        refreshPage();
        window.location.href = "/";
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Link to={`/`}><Navbar.Brand>Mi Proyecto</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {!savedUserId ?
                                <>
                                    <Button variant="outline-light" className="me-2" onClick={() => setShowLogin(true)}>Iniciar sesión</Button>
                                    <Button variant="success" onClick={() => setShowRegistro(true)}>Registrarse</Button>
                                </>
                                : <Button as={Link} to="/panel/new" variant='primary'>Perfil</Button>
                            }
                            {savedUserId &&
                                <>
                                <Link to={`/publicar`}><Button variant='primary'>Publicar</Button></Link>
                                <Button variant='primary' onClick={() => handlerLogout()}>Logout</Button>
                                </>
                            }
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
