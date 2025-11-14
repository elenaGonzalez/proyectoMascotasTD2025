import { Modal, Button, Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'

function Registro({ show, onHide }) {
const [submitSuccess, setSubmitSuccess] = useState(false)
const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contraseña: '',
    confirmContraseña: ''
    },
    mode: 'onBlur'
})

const onSubmit = (data) => {
    console.log('Datos del registro:', data)
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
        <Modal.Title>Registrarse</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {submitSuccess && (
        <div className="alert alert-success" role="alert">
            ¡Registro exitoso! ✅
        </div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
        <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Controller
            name="nombre"
            control={control}
            rules={{
                required: 'El nombre es obligatorio',
                minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
                },
                maxLength: {
                value: 50,
                message: 'El nombre no puede exceder 50 caracteres'
                },
                pattern: {
                value: /^[a-záéíóúñ\s]+$/i,
                message: 'Solo se permiten letras y espacios'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="text"
                    placeholder="Ingresá tu nombre"
                    isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.nombre?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

          {/* Apellido */}
        <Form.Group className="mb-3">
            <Form.Label>Apellido *</Form.Label>
            <Controller
            name="apellido"
            control={control}
            rules={{
                required: 'El apellido es obligatorio',
                minLength: {
                value: 2,
                message: 'El apellido debe tener al menos 2 caracteres'
                },
                maxLength: {
                value: 50,
                message: 'El apellido no puede exceder 50 caracteres'
                },
                pattern: {
                value: /^[a-záéíóúñ\s]+$/i,
                message: 'Solo se permiten letras y espacios'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="text"
                    placeholder="Ingresá tu apellido"
                    isInvalid={!!errors.apellido}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.apellido?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

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

          {/* Teléfono */}
        <Form.Group className="mb-3">
            <Form.Label>Teléfono *</Form.Label>
            <Controller
            name="telefono"
            control={control}
            rules={{
                required: 'El teléfono es obligatorio',
                pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: 'Ingresá un número de teléfono válido'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="tel"
                    placeholder="Ej. +54 3777 123456"
                    isInvalid={!!errors.telefono}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.telefono?.message}
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
                },
                pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Debe contener mayúscula, minúscula y número'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="password"
                    placeholder="Crea una contraseña segura"
                    isInvalid={!!errors.contraseña}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.contraseña?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

          {/* Confirmar Contraseña */}
        <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña *</Form.Label>
            <Controller
            name="confirmContraseña"
            control={control}
            rules={{
                required: 'Debe confirmar la contraseña',
                validate: (value) => {
                const contraseña = document.querySelector('input[type="password"]').value
                return value === contraseña || 'Las contraseñas no coinciden'
                }
            }}
            render={({ field }) => (
                <>
                <Form.Control
                    {...field}
                    type="password"
                    placeholder="Confirma tu contraseña"
                    isInvalid={!!errors.confirmContraseña}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.confirmContraseña?.message}
                </Form.Control.Feedback>
                </>
            )}
            />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
            Registrarse
        </Button>
        </Form>
    </Modal.Body>
    </Modal>
)
}

export default Registro