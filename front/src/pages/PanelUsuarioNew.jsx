import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import NavbarMain from "../component/layout/Navbar.jsx";
import Footer from "../component/layout/Footer.jsx";
import Login from "../component/auth/Login.jsx";
import Registro from "../component/auth/Registro.jsx";
import Soporte from "../component/support/Soporte.jsx";
import Contacto from "./Contacto.jsx";
import CardNew from '../component/layout/CardNew.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getPublicaciones } from '../redux/publicacionesSlice.js';
import { useNavigate } from 'react-router-dom';

function PanelUsuarioNew() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [showSoporte, setShowSoporte] = useState(false);
  const [showContacto, setShowContacto] = useState(false);

  const [datosUsuario, setDatosUsuario] = useState();
  const savedUserId = JSON.parse(localStorage.getItem('usuario'));
  const publicaciones = useSelector((state) => state.publicaciones);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (savedUserId) {
      fetch(`http://localhost:3000/api/usuarios/${savedUserId}`)
        .then(res => res.json())
        .then(data => {
          setDatosUsuario(data);
        })
        .catch(err => setError(err.message));
    }
  }, [savedUserId, publicaciones]);

  const [error, setError] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (data) => {
    console.log("En handle Delete ", data);
    try {
      await axios({
        method: "delete",
        url: "http://localhost:3000/api/publicaciones",
        data: {
          id: data
        }
      })

      let publicaciones_sin_dog = publicaciones.rows.filter(perro => perro.mascota_id !== data);
      setDatosUsuario(datosUsuario?.mascotas?.filter(perro => perro.id !== data));
      dispatch(getPublicaciones(publicaciones_sin_dog));
      navigate("/");
    } catch (error) {
      alert(error);
    }

  }


  const handleSave = async (e) => {
    e.preventDefault();
    const id = editUser.id || datosUsuario.id;
    const payload = {
      id,
      nombre: editUser.nombre,
      apellido: editUser.apellido,
      telefono: editUser.telefono
    };

    try {
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Error al actualizar usuario');
      }

      const updated = await res.json();

      setDatosUsuario(updated);
      sessionStorage.setItem('usuarioEditandoId', updated.id);
      setShowEdit(false);
      alert('Perfil actualizado correctamente');
    } catch (err) {
      console.error('Error guardando usuario:', err);
      alert('Error guardando usuario: ' + (err.message || err));
    }
  };

  const handleOpenEdit = () => {
    setEditUser(datosUsuario ? { ...datosUsuario } : {});
    setShowEdit(true);
  }


  if (error) return <div>Error: {error}</div>;
  if (!datosUsuario) return <div><img src="https://illustcut.com/box/mark/hatena2/hatena01_27.png" alt="usuario no existe" /><h1>Usuario no existe</h1></div>;

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Mi Perfil
                </h4>
                <Button size="sm" variant="light" onClick={handleOpenEdit}>
                  Editar
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <div
                    className="bg-light rounded-circle mx-auto d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: '90px',
                      height: '90px',
                      fontSize: '2.2rem',
                      color: '#0d6efd'
                    }}
                  >
                    {datosUsuario.nombre?.charAt(0) || ''}
                  </div>
                  <h5 className="mt-3 mb-1">{datosUsuario.nombre} {datosUsuario.apellido}</h5>
                  <Badge bg="success">Usuario Activo</Badge>
                </div>

                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Nombre</Form.Label>
                      <Form.Control type="text" value={datosUsuario.nombre || ''} readOnly />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Apellido</Form.Label>
                      <Form.Control type="text" value={datosUsuario.apellido || ''} readOnly />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Email</Form.Label>
                      <Form.Control type="email" value={datosUsuario.email || ''} readOnly />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Teléfono</Form.Label>
                      <Form.Control type="tel" value={datosUsuario.telefono || ''} readOnly />
                    </Col>
                  </Row>

                </Form>
              </Card.Body>

            </Card>
          </Col>
        </Row>
        <br />
        <h5 className='text-center'>Mis Mascotas en adopcion</h5>
        <div className="row justify-content-center w-100 g-3" style={{ padding: "1rem", margin: "0 auto" }}>

          {datosUsuario?.mascotas?.map(m =>
            <div key={datosUsuario.id} className="col-12 col-sm-6 col-lg-4 d-flex">
              <CardNew
                key={m.id}
                mascota_id={m.id}
                nombre={m.nombre}
                edad={m.edad}
                genero={m.genero}
                foto={m.foto}
                handleDelete={handleDelete}
                showFooter={false} />
            </div>
          )}
        </div>
      </Container>

      {/* Modal de Edición (igual estilo que tu Registro) */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editUser.nombre || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={editUser.apellido || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                value={editUser.telefono || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>


            <Button type="submit" variant="success" className="w-100">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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

export default PanelUsuarioNew
