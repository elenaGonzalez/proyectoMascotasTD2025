import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../redux/usuarioSlice";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ show, onHide }) {
  const dispatch = useDispatch();

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

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: data.email,
          contrasena: data.contraseña,
        }
      );

      // Guardar en Redux
      dispatch(setUsuario(res.data));

      // Guardar en localStorage
      localStorage.setItem("usuario", JSON.stringify(res.data.id))
      localStorage.setItem('token', JSON.stringify(res.data.token));

      // SweetAlert de bienvenida
      Swal.fire({
        title: `¡Bienvenido ${res.data.nombre}!`,
        icon: "success",
        draggable: true,
      });

      reset();
      onHide();

    } catch (error) {
      // Obtenemos el mensaje del backend
      const msg = error.response?.data?.Error || "Error en el servidor";

      // SweetAlert de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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

          <div style={{ position: "relative" }}>
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
              type={showPassword ? "text" : "password"}
              placeholder="Ingresá tu contraseña"
              isInvalid={!!errors.contraseña}
            />

          {/* OJITO PARA VER LA CONTRASEÑA */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              opacity: 0.7,
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

          <Form.Control.Feedback type="invalid">
            {errors.contraseña?.message}
          </Form.Control.Feedback>
        </>
      )}
    />
  </div>
</Form.Group>


          <Button type="submit" variant="success" className="w-100 mb-2">
            Iniciar Sesión
          </Button>
        </Form>

      </Modal.Body>
    </Modal>
  );
}

export default Login;
