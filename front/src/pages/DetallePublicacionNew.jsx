import React, { useEffect } from "react";
// Importaciones de Redux y Router
import { useSelector } from "react-redux"; // ⬅️ Usamos useSelector
import { useParams } from "react-router-dom"; // ⬅️ Usamos useParams
// Importaciones de Componentes de Layout (se mantienen para Modals)
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "./Contacto.jsx";
// Componentes de Bootstrap
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"; // Necesario para centrar

function DetallePublicacionNew() {
  // 1. Obtener el ID de la URL
  const { id } = useParams();

  // 2. Obtener el array completo de publicaciones desde Redux
  const todasPublicaciones = useSelector((state) => state.publicaciones.rows) || [];
  
  // 3. Buscar la publicación específica localmente
  const publicacion = todasPublicaciones.find(pub => pub.id === id);

  // 4. Estados de modales (para botones de login/registro si se usan en la página)
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegistro, setShowRegistro] = React.useState(false);
  const [showSoporte, setShowSoporte] = React.useState(false);
  const [showContacto, setShowContacto] = React.useState(false);

  // 🛑 Manejo de Carga y Errores
  if (!publicacion) {
    // Si la publicación aún no ha llegado de Redux, muestra un mensaje
    return <div className="text-center my-5">Cargando detalles o publicación no encontrada...</div>;
  }

  // 🚀 RENDERIZADO PRINCIPAL
  return (
    // Usamos un Container para que el contenido se vea centrado y limpio
    <Container className="my-5"> 
      {/* ❌ ELIMINADO: NavbarMain, Footer, y los modales duplicados de este return */}
      
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {/* Usamos el objeto "publicacion" encontrado por el ID */}
        <Image src={publicacion.mascota.foto} fluid style={{ maxWidth: '400px', borderRadius: '8px' }} />
        
        <Card style={{ maxWidth: '600px' }}>
          <Card.Header>{publicacion.mascota.nombre}</Card.Header>
          <Card.Body>
            <Card.Title>{publicacion.titulo}</Card.Title>
            <Card.Text>
              <blockquote className="blockquote mb-0">
                {publicacion.descripcion}
              </blockquote>

              <hr className="my-3" />
              
              {/* Bloque de Datos Detallados */}
              <div>
                Raza:{" "}
                {publicacion.mascota.raza === ""
                  ? "sin definir"
                  : publicacion.mascota.raza}
              </div>
              <div>Edad : {publicacion.mascota.edad}</div>
              <div>Genero : {publicacion.mascota.genero}</div>
              {/* Nota: Aquí se asume que 'categoria' existe en la mascota */}
              <div>Categoria : {publicacion.mascota.categoria}</div> 
              <div>
                Vacunado : {publicacion.mascota.vacunado ? "sí" : "no"}
              </div>
              <div>
                Destetado : {publicacion.mascota.destetado ? "sí" : "no"}
              </div>
              <div>
                Esterilizado :{" "}
                {publicacion.mascota.esterilizado ? "sí" : "no"}
              </div>
              <div>Aprendizaje : {publicacion.mascota.aprendizaje}</div>
              <div>Ciudad : {publicacion.mascota.ciudad}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      {/* Se mantienen los modales, pero fuera del flujo principal de la página */}
      <Login show={showLogin} onHide={() => setShowLogin(false)} />
      <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
      <Soporte show={showSoporte} onHide={() => setShowSoporte(false)} />
      <Contacto show={showContacto} onHide={() => setShowContacto(false)} />
    </Container>
  );
}

export default DetallePublicacionNew;