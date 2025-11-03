import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function Soporte({ show, onHide }) {
const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
});

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Mensaje enviado correctamente.");
    onHide(); // cerrar modal
};

return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
        <Modal.Title>Soporte</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
            type="text"
            name="apellido"
            placeholder="Tu apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
            type="email"
            name="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
            type="tel"
            name="telefono"
            placeholder="Tu teléfono"
            value={formData.telefono}
            onChange={handleChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            name="mensaje"
            placeholder="Escribí tu mensaje..."
            value={formData.mensaje}
            onChange={handleChange}
            required
            />
        </Form.Group>

        <div className="d-flex justify-content-evenly">
            <Button variant="success" type="submit">
            Enviar
            </Button>
            <Button variant="danger" onClick={onHide}>
            Cancelar
            </Button>
        </div>
        </Form>
    </Modal.Body>
    </Modal>
);
}

export default Soporte;
