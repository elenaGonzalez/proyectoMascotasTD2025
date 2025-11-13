import { useEffect, useState } from "react";
import NavbarMain from "../component/layout/Navbar.jsx";
import Principal from "../component/layout/Principal.jsx";
import Footer from "../component/layout/Footer.jsx";
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "../pages/Contacto.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPublicaciones } from "../redux/publicacionesSlice.js";
import CardNew from "../component/layout/CardNew.jsx";

function HomeNew() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);

  const publicaciones = useSelector((state) => state.publicaciones);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/publicaciones")
      .then((res) => dispatch(getPublicaciones(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <>
      {console.log(publicaciones)}
      <NavbarMain
        onLoginClick={() => setShowLogin(true)}
        onRegistroClick={() => setShowRegistro(true)}
      />
      <Principal />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {publicaciones.map((publicacion) => (
          <CardNew
            key={publicacion.id}
            id={publicacion.id}
            titulo={publicacion.titulo}
            telefono={publicacion.telefono}
            fecha_publicacion={publicacion.fecha_publicacion}
            nombre={publicacion.mascota.nombre}
            mascota_id={publicacion.mascotaId}
            foto={publicacion.mascota.foto}
            ciudad={publicacion.mascota.ciudad}
          />
        ))}
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

export default HomeNew;
