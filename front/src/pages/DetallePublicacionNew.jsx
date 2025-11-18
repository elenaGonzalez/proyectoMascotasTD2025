import Footer from "../component/layout/Footer.jsx";
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "./Contacto.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import NavbarMain from "../component/layout/Navbar.jsx";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card';

function DetallePublicacionNew() {
  const { id } = useParams();
  const publicaciones = useSelector((state) => state.publicaciones);
  const publicacion = publicaciones.rows.find((m) => m.id == id);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);

  return (
    <>
      <NavbarMain
        onLoginClick={() => setShowLogin(true)}
        onRegistroClick={() => setShowRegistro(true)}
      />

      <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          padding: '1rem',
          
        }}>
   <Image src={publicacion.mascota.foto} fluid/>
   <Card>
    <Card.Header>{publicacion.mascota.nombre}</Card.Header>
      <Card.Body>
        <Card.Title>{publicacion.titulo}</Card.Title>
        <Card.Text>
          <blockquote className="blockquote mb-0">
          <p>
            {publicacion.descripcion}
          </p>  
          </blockquote>
          
          <div>------------------------------------------------------</div>
          <div>Raza : {publicacion.mascota.raza}</div>
          <div>Edad : {publicacion.mascota.edad}</div>
          <div>Genero : {publicacion.mascota.genero}</div>
          <div>Vacunado : {publicacion.mascota.vacunado ? "si" : "no"}</div>
           <div>Ciudad : {publicacion.mascota.ciudad}</div>
        </Card.Text>
      </Card.Body>
      </Card>

      </div> 
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

export default DetallePublicacionNew;
