import { Modal, Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../redux/usuarioSlice";
import axios from "axios";
import Swal from "sweetalert2";

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
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contraseña?.message}
                  </Form.Control.Feedback>
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Controller
              name="recuerdame"
              control={control}
              render={({ field }) => (
                <Form.Check {...field} type="checkbox" label="Recuérdame" />
              )}
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100 mb-2">
            Iniciar Sesión
          </Button>
        </Form>

        <Button variant="link" className="w-100">
          ¿Olvidaste tu contraseña?
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
