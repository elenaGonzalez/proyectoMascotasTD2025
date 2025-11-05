import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

function Footer({ onLoginClick, onRegistroClick, onSoporteClick, onContactoClick }) {
return (
    <footer className="bg-dark text-light py-4 mt-5">
    <Container>
        <Row className="justify-content-center text-center text-md-start">
          {/* --- Ayuda --- */}
        <Col md={3} sm={6} className="mb-3">
            <h5>Ayuda</h5>
            <ul className="list-unstyled">
            <li><a href="#" className="text-light" onClick={onSoporteClick}>Soporte</a></li>
            <li><a href="#" className="text-light" onClick={onContactoClick}>Contacto</a></li>
            </ul>
        </Col>

          {/* --- Redes Sociales --- */}
        <Col md={3} sm={6} className="mb-3">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-start gap-3">
            <li><a href="https://facebook.com" className="text-light"><FaFacebook size={22} /></a></li>
            <li><a href="https://instagram.com" className="text-light"><FaInstagram size={22} /></a></li>
            <li><a href="https://x.com" className="text-light"><FaXTwitter size={22} /></a></li>
            </ul>
        </Col>

          {/* --- Cuenta --- */}
        <Col md={2} sm={6} className="mb-3">
            <h5>Cuenta</h5>
            <ul className="list-unstyled">
            <li><a href="#" className="text-light" onClick={onRegistroClick}>Crear cuenta</a></li>
            <li><a href="#" className="text-light" onClick={onLoginClick}>Iniciar sesión</a></li>
            </ul>
        </Col>
        </Row>

        <hr className="border-secondary" />
        <p className="text-center mb-0 small">
        © {new Date().getFullYear()} Proyecto web adopciones - Todos los derechos reservados.
        </p>
    </Container>
    </footer>
);
}

export default Footer;
