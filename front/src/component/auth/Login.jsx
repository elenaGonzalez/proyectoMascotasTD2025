import { Modal, Button, Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'

function Login({ show, onHide }) {
const [submitSuccess, setSubmitSuccess] = useState(false)
const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
    email: '',
    contraseña: '',
    recuerdame: false
    },
    mode: 'onBlur'
})

const onSubmit = (data) => {
    console.log('Datos del login:', data)
    setSubmitSuccess(true)
    reset()
    setTimeout(() => {
    setSubmitSuccess(false)
    onHide()
    }, 1500)
}

return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {submitSuccess && (
        <div className="alert alert-success" role="alert">
            ¡Bienvenido! ✅
        </div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
        <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Controller
            name="email"
            control={control}
            rules={{
                required: 'El email es obligatorio',
                pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresá un email válido'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="email"
                    placeholder="Ingresá tu correo"
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

          {/* Contraseña */}
        <Form.Group className="mb-3">
            <Form.Label>Contraseña *</Form.Label>
            <Controller
            name="contraseña"
            control={control}
            rules={{
                required: 'La contraseña es obligatoria',
                minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="password"
                    placeholder="Ingresá tu contraseña"
                    isInvalid={!!errors.contraseña}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.contraseña?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

          {/* Recuérdame */}
        <Form.Group className="mb-3">
            <Controller
            name="recuerdame"
            control={control}
            render={({ field }) => (
                <Form.Check
                {...field}
                type="checkbox"
                label="Recuérdame"
                />
            )}
            />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100 mb-2">
            Iniciar Sesión
        </Button>
        </Form>
    </Modal.Body>
    </Modal>
)
}

export default Login