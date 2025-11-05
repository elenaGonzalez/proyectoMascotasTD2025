import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import NavbarMain from "../component/layout/Navbar.jsx";
import Footer from "../component/layout/Footer.jsx";

function Publicar() {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setSuccess(true);
      form.reset();
    }
    setValidated(true);
  };

  return (
    <>
      <NavbarMain />

      <div
        style={{
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
          padding: "60px 5vw",
          width: "99vw",          // 🔹 fuerza a ocupar todo el ancho de la ventana
          margin: "0",
        }}
      >
        <Card className="shadow-lg border-0 p-5 w-100" style={{ maxWidth: "100%" }}>
          <h2 className="text-center mb-4 text-dark">
            Publicar un animal en adopción
          </h2>

          {success && (
            <Alert variant="success" className="text-center">
              ¡Anuncio publicado con éxito!
            </Alert>
          )}


          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4 mt-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Categoría *</Form.Label>
                <Form.Select required>
                  <option value="">Selecciona una categoría</option>
                  <option>Perros en adopción</option>
                  <option>Gatos en adopción</option>
                  <option>Otros animales</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Selecciona una categoría
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Título *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ej. Cachorro busca hogar"
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Ubicación *</Form.Label>
                <Form.Control required type="text" placeholder="Ciudad o barrio" />
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Imagen del animal *</Form.Label>
                <Form.Control required type="file" accept="image/*" />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="4">
                <Form.Label>Vacunas</Form.Label>
                <Form.Select>
                  <option>--</option>
                  <option>Sí</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Destetado</Form.Label>
                <Form.Select>
                  <option>--</option>
                  <option>Sí</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Esterilizado *</Form.Label>
                <Form.Select required>
                  <option value="">Selecciona una opción</option>
                  <option>Sí</option>
                  <option>No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="4">
                <Form.Label>Tipo de alimentación</Form.Label>
                <Form.Select>
                  <option>--</option>
                  <option>Comida blanda</option>
                  <option>Leche materna</option>
                  <option>Pellet</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Raza</Form.Label>
                <Form.Control type="text" placeholder="Opcional" />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Sexo</Form.Label>
                <Form.Select>
                  <option>--</option>
                  <option>Hembra</option>
                  <option>Macho</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Fecha de nacimiento (Aprox.)</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Antiparasitario</Form.Label>
                <Form.Select>
                  <option>--</option>
                  <option>Sí</option>
                  <option>No</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Aprendizaje sanitario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Hace sus necesidades afuera"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe una breve descripción del animal"
                required
              />
              <Form.Control.Feedback type="invalid">
                Este campo es obligatorio
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center mt-4">
              <Button type="submit" variant="success" className="me-2 px-4">
                Publicar Anuncio
              </Button>
              <Button type="reset" variant="danger" className="px-4">
                Cancelar
              </Button>
            </div>
          </Form>
        </Card>
      </div>

      <Footer />
    </>
  );
}

export default Publicar;

