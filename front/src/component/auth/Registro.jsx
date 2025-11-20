import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Registro({ show, onHide }) {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registeredName, setRegisteredName] = useState("")

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

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => {
        setShowToast(false)
        onHide()
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [showToast, onHide])

  const onSubmit = async (data) => {
    setIsLoading(true) // Indicar que el registro esta en proceso, esto deshabilita el modal para evitar cierres accidentales 
    setErrorMessage("")
    try {
      const res = await axios.post("http://localhost:3000/api/auth/registro", {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        contrasena: data.contraseña,
        telefono: data.telefono
      })

      // respuesta OK
      const nameToShow = res.data?.nombre || data.nombre || ""
      setRegisteredName(nameToShow)
      setSubmitSuccess(true)
      setShowToast(true)
      reset()
    } catch (err) {
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.Error ||
        err.response?.data?.error ||
        err.message ||
        "Error en el registro"
      setErrorMessage(backendMsg)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // estilos inline para notificación flotante simple
  const toastStyle = {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 1050,
    minWidth: 280,
    padding: '12px 16px',
    borderRadius: 10,
    background: 'linear-gradient(90deg,#10b981,#059669)',
    color: 'white',
    boxShadow: '0 8px 30px rgba(5,150,105,0.18)',
    display: showToast ? 'flex' : 'none',
    gap: 12,
    alignItems: 'center'
  }

  return (
    <>
      {/* Toast flotante */}
      <div style={toastStyle} aria-live="polite">
        <div style={{ fontSize: 18, fontWeight: 700 }}>✓</div>
        <div>
          <div style={{ fontWeight: 700 }}>Registro exitoso</div>
          <div style={{ fontSize: 13, opacity: 0.95 }}>{registeredName ? `Bienvenido ${registeredName}` : 'Registro completado'}</div>
        </div>
      </div>

      <Modal show={show} onHide={onHide} centered backdrop={isLoading ? "static" : true}>
        <Modal.Header closeButton={!isLoading}>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Error del servidor */}
          {errorMessage && (
            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
              <strong>Error</strong>
              <div>{errorMessage}</div>
            </Alert>
          )}

          {/* Mensaje success dentro del modal (opcional, se duplica con el toast) */}
          {submitSuccess && !showToast && (
            <Alert variant="success">
              ¡Registro exitoso! ✅
            </Alert>
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
                  minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                  maxLength: { value: 50, message: 'El nombre no puede exceder 50 caracteres' },
                  pattern: { value: /^[a-záéíóúñ\s]+$/i, message: 'Solo se permiten letras y espacios' }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="text" placeholder="Ingresá tu nombre" isInvalid={!!errors.nombre} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
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
                  minLength: { value: 2, message: 'El apellido debe tener al menos 2 caracteres' },
                  maxLength: { value: 50, message: 'El apellido no puede exceder 50 caracteres' },
                  pattern: { value: /^[a-záéíóúñ\s]+$/i, message: 'Solo se permiten letras y espacios' }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="text" placeholder="Ingresá tu apellido" isInvalid={!!errors.apellido} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.apellido?.message}</Form.Control.Feedback>
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
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresá un email válido' }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="email" placeholder="Ingresá tu correo" isInvalid={!!errors.email} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
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
                  pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message: 'Ingresá un número de teléfono válido' }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="tel" placeholder="Ej. +54 3777 123456" isInvalid={!!errors.telefono} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.telefono?.message}</Form.Control.Feedback>
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
                  minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
                  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Debe contener mayúscula, minúscula y número' }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="password" placeholder="Crea una contraseña segura" isInvalid={!!errors.contraseña} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.contraseña?.message}</Form.Control.Feedback>
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
                    const inputs = document.querySelectorAll('input[type="password"]')
                    const pass = inputs[0]?.value || ''
                    return value === pass || 'Las contraseñas no coinciden'
                  }
                }}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="password" placeholder="Confirma tu contraseña" isInvalid={!!errors.confirmContraseña} disabled={isLoading} />
                    <Form.Control.Feedback type="invalid">{errors.confirmContraseña?.message}</Form.Control.Feedback>
                  </>
                )}
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100" disabled={isLoading}>
              {isLoading ? <><Spinner as="span" animation="border" size="sm" className="me-2" />Registrando...</> : "Registrarse"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Registro