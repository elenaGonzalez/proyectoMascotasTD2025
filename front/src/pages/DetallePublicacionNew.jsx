import Footer from "../component/layout/Footer.jsx";
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "./Contacto.jsx";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavbarMain from "../component/layout/Navbar.jsx";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";

function DetallePublicacionNew() {
  const { id } = useParams();
  const usuario = useSelector((state) => state.usuario);
  const savedUsuarioId = JSON.parse(localStorage.getItem("usuario"));
  const [publicacion, setPublicacion] = useState();
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:3000/api/publicaciones/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPublicacion(data);
      })
      .catch((err) => console.error(err.message));
  }, [id]);

  const handleContactar = () => {
    if (!publicacion) return;

    const duenioId = publicacion.mascota.usuarioId;
    const duenio = publicacion.mascota.usuario;

    if (!usuario || !savedUsuarioId) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Inicia sesión o registrate para poder contactar al dueño.",
      });
      return;
    }

    if (savedUsuarioId === duenioId) {
      Swal.fire({
        icon: "info",
        title: "Esta publicación es tuya",
        text: "No puedes contactarte contigo mismo 😅",
      });
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Datos del dueño",
      html: `
        <p><strong>Nombre:</strong> ${duenio.nombre} ${duenio.apellido}</p>
        <p><strong>Email:</strong> ${duenio.email}</p>
        ${
          duenio.telefono
            ? `<p><strong>Teléfono:</strong> ${duenio.telefono}</p>`
            : ""
        }
      `,
      confirmButtonText: "Cerrar",
    });
  };

  if (loading) return <p>Cargando publicación...</p>;
  if (!publicacion) return <p>No se encontró la publicación.</p>;

  return (
    <>

<div
  style={{
    maxWidth: "1100px",
    margin: "2rem auto",
    display: "flex",
    gap: "2rem",
    padding: "1rem",
    alignItems: "stretch",
    flexWrap: "nowrap",
  }}
  className="detalle-publicacion-layout"
>

  {/* COLUMNA IMAGEN */}
  <div
    style={{
      flex: "1 1 450px",
      maxWidth: "450px",
      height: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    }}
  >
    <Image
      src={publicacion.mascota.foto}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  </div>

  {/* COLUMNA DATOS */}
  <Card
    style={{
      flex: "1 1 450px",
      maxWidth: "550px",
      borderRadius: "12px",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    }}
  >
    <Card.Header
      style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        textAlign: "center",
      }}
    >
      {publicacion.mascota.nombre}
    </Card.Header>

    <Card.Body style={{ flexGrow: 1 }}>
      <Card.Title style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
        {publicacion.titulo}
      </Card.Title>

      <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
        {publicacion.descripcion}
      </p>

      <div
        style={{
          borderTop: "1px solid #ddd",
          marginTop: "1rem",
          paddingTop: "1rem",
          fontSize: "1rem",
          lineHeight: "1.8",
        }}
      >
        <div>🐾 <strong>Raza:</strong> {publicacion.mascota.raza || "Sin definir"}</div>
        <div>🎂 <strong>Edad:</strong> {publicacion.mascota.edad}</div>
        <div>⚥ <strong>Género:</strong> {publicacion.mascota.genero}</div>
        <div>📂 <strong>Categoría:</strong> {publicacion.mascota.categoria}</div>
        <div>💉 <strong>Vacunado:</strong> {publicacion.mascota.vacunado ? "Sí" : "No"}</div>
        <div>🍼 <strong>Destetado:</strong> {publicacion.mascota.destetado ? "Sí" : "No"}</div>
        <div>✂️ <strong>Esterilizado:</strong> {publicacion.mascota.esterilizado ? "Sí" : "No"}</div>
        <div>📘 <strong>Aprendizaje:</strong> {publicacion.mascota.aprendizaje}</div>
        <div>🧭 <strong>Ciudad:</strong> {publicacion.mascota.ciudad}</div>
      </div>
    </Card.Body>

    {/* BOTÓN AL FINAL PARA QUE LA ALTURA SE EMPAREJE */}
    <button className="btn btn-primary w-100 mt-3" onClick={handleContactar}>
      Contactar Dueño
    </button>
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