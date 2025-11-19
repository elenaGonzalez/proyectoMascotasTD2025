import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./Login.css";

function Login({ show, onHide }) {
  const dispatch = useDispatch();
    
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      contraseña: "",
      recuerdame: false,
    },
    mode: "onBlur",
  });

  // Toast desaparece después de 3 segundos
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, onHide]);

  const onSubmit = async(data) => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const res = await axios({
        method: 'post', 
        url: "http://localhost:3000/api/auth/login",
        data:{
          email: data.email, 
          contrasena: data.contraseña
        }
      });
      
      // Guardamos el usuario en localStorage o redux
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify({
        nombre: res.data.nombre,
        apellido: res.data.apellido,
        role: res.data.role
      }));
      
      setSubmitSuccess(true);
      setShowToast(true);
      reset();
      
    } catch (err) {
      // Captura mensajes de error del backend
      const errorMsg = err.response?.data?.Error || 
                      err.response?.data?.message || 
                      "Email o contraseña incorrectos";
      setErrorMessage(errorMsg);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast flotante de éxito */}
      <div className={`toast-container ${showToast ? "show" : ""}`}>
        <div className="toast-content">
          <div className="toast-icon">✓</div>
          <div className="toast-text">
            <h5>¡Bienvenido {(JSON.parse(localStorage.getItem('usuario') || '{}'))?.nombre}!</h5>
            <p>Has iniciado sesión correctamente</p>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={onHide} centered backdrop={isLoading ? "static" : true}>
        <Modal.Header closeButton={!isLoading}>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alerta de Error */}
          {errorMessage && (
            <Alert 
              variant="danger" 
              onClose={() => setErrorMessage("")} 
              dismissible
              className="d-flex align-items-center"
            >
              <i className="bi bi-exclamation-circle-fill me-2" style={{ fontSize: "1.5rem" }}></i>
              <div>
                <Alert.Heading className="mb-2">Error en la autenticación</Alert.Heading>
                <p className="mb-0">{errorMessage}</p>
              </div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresá un email válido",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      {...field}
                      type="email"
                      placeholder="Ingresá tu correo"
                      isInvalid={!!errors.email}
                      disabled={isLoading}
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
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      {...field}
                      type="password"
                      placeholder="Ingresá tu contraseña"
                      isInvalid={!!errors.contraseña}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contraseña?.message}
                    </Form.Control.Feedback>
                  </>
                )}
              />
            </Form.Group>

            {/* Recuérdame */}
            <Form.Group className="mb-4">
              <Controller
                name="recuerdame"
                control={control}
                render={({ field }) => (
                  <Form.Check 
                    {...field} 
                    type="checkbox" 
                    label="Recuérdame"
                    disabled={isLoading}
                  />
                )}
              />
            </Form.Group>

            <Button 
              type="submit" 
              variant="success" 
              className="w-100 mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;