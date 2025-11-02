import { Modal, Button, Form } from 'react-bootstrap'

function Registro({ show, onHide }) {
const handleSubmit = (e) => {
    e.preventDefault()
    alert('Registro simulado ✅')
    onHide()
}

return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresá tu nombre" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder="Ingresá tu apellido" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresá tu correo" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="tel" placeholder="Ingresá tu teléfono" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Crea una contraseña" required />
        </Form.Group>
        <Button type="submit" variant="success" className="w-100">Registrarse</Button>
        </Form>
    </Modal.Body>
    </Modal>
)
}

export default Registro
