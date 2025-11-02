import { Modal, Button, Form } from 'react-bootstrap'

function Login({ show, onHide }) {
const handleSubmit = (e) => {
    e.preventDefault()
    alert('Inicio de sesión simulado ✅')
    onHide()
}

return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresá tu correo" required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresá tu contraseña" required />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">Entrar</Button>
        </Form>
    </Modal.Body>
    </Modal>
)
}

export default Login
