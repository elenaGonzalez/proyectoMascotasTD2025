import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import NavbarMain from "../component/layout/Navbar.jsx";

function PanelUsuario() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);

  // PARTE DE LA CARGA DE USUARIOS DESDE BACKEND


  useEffect(() => {
    //savedUserId -> Se fija si ya hay una sesion activa. Finaliza al cerrar la pestaña. 
    const savedUserId = sessionStorage.getItem('usuarioEditandoId');

    if (savedUserId) {
      // Si ya hay un usuario guardado, trae ESE usuario específicamente por id
      fetch(`http://localhost:3000/api/usuarios/${savedUserId}`)
        .then(res => res.json())
        .then(data => {
          setUsuario(data);
        })
        .catch(err => setError(err.message));
    } else {
      // Primera carga: trae todos, selecciona data[x] y guarda su id
      fetch('http://localhost:3000/api/usuarios')
        .then(res => res.json())
        .then(data => {
          const usuarioSeleccionado = data[2];
          setUsuario(usuarioSeleccionado);
          //Guarda el id del usuario seleccionado en sessionStorage por si se recarga la pagina
          sessionStorage.setItem('usuarioEditandoId', usuarioSeleccionado.id);
        })
        .catch(err => setError(err.message));
    }
  }, []);



  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);


  // Estado para el modal de edición
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState({});

  // Manejar cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();
    const id = editUser.id || usuario.id;
    const payload = {
      id,
      nombre: editUser.nombre,
      apellido: editUser.apellido,
      telefono: editUser.telefono
    };


    try {
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'PUT', // la ruta del backend está configurada como PUT '/'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // lee mensaje de error del backend si lo envía
        const errText = await res.text();
        throw new Error(errText || 'Error al actualizar usuario');
      }

      const updated = await res.json();

      // Actualiza el estado local con el usuario retornado por el servidor
      setUsuario(updated);
      sessionStorage.setItem('usuarioEditandoId', updated.id); // Guarda el id
      setShowEdit(false);
      alert('Perfil actualizado correctamente');
    } catch (err) {
      console.error('Error guardando usuario:', err);
      alert('Error guardando usuario: ' + (err.message || err));
    }


  };


  //CARGAR DATOS DEL USUARIO
  const handleOpenEdit = () => {
    setEditUser(usuario ? { ...usuario } : {});
    setShowEdit(true);
  }


  if (error) return <div>Error: {error}</div>;
  if (!usuario) return <div><img src="https://illustcut.com/box/mark/hatena2/hatena01_27.png" alt="usuario no existe" /><h1>Usuario no existe</h1></div>;

  return (
    <>

      <NavbarMain
        onLoginClick={() => setShowLogin(true)}
        onRegistroClick={() => setShowRegistro(true)}
      />

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
                    {usuario.nombre?.charAt(0) || ''}
                  </div>
                  <h5 className="mt-3 mb-1">{usuario.nombre} {usuario.apellido}</h5>
                  <Badge bg="success">Usuario Activo</Badge>
                </div>

                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Nombre</Form.Label>
                      <Form.Control type="text" value={usuario.nombre || ''} readOnly />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Apellido</Form.Label>
                      <Form.Control type="text" value={usuario.apellido || ''} readOnly />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Email</Form.Label>
                      <Form.Control type="email" value={usuario.email || ''} readOnly />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="text-muted small">Teléfono</Form.Label>
                      <Form.Control type="tel" value={usuario.telefono || ''} readOnly />
                    </Col>
                  </Row>

                </Form>
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal de Edición (igual estilo que tu Registro) */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        {console.log('Modal Edit User:', usuario)}
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
    </>
  );
}

export default PanelUsuario
