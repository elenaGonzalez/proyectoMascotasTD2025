import React, { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Alert,
    Card,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";

// ❌ Se eliminaron las importaciones duplicadas de NavbarMain y Footer.

export default function Publicar() {
    const usuario = useSelector((state) => state.usuario);

  const [success, setSuccess] = useState(false);
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoria: "",
      titulo: "",
      nombre: "",
      ciudad: "",
      foto: "",
      telefono: "",
      vacunado: "",
      destetado: "",
      esterilizado: "",
      alimentacion: "",
      raza: "",
      genero: "",
      edad: "",
      antiparasitario: "",
      aprendizaje: "",
      descripcion: "",
      usuarioId: ""
    },
    mode: "onBlur",
  });

    const onSubmit = async (data) => {
        // ⬅️ CORRECCIÓN DE LÓGICA: Convertir strings "true"/"false" a booleanos
        let decodedTokenUsu;
    const token = localStorage.getItem('token'); 
    if(token){
        decodedTokenUsu = jwtDecode(localStorage.getItem('token'))
    } 
    let id_usuario = decodedTokenUsu.id;

        data.vacunado = data.vacunado === "true";
        data.destetado = data.destetado === "true";
        data.esterilizado = data.esterilizado === "true";
        data.antiparasitario = data.antiparasitario === "true";
        

        await axios({
            method: "post",
            url: "http://localhost:3000/api/publicaciones",
            data: {
                // Estructura de envío de datos
                nombre: data.nombre,
                genero: data.genero,
                edad: data.edad,
                vacunado: data.vacunado,
                destetado: data.destetado,
                esterilizado: data.esterilizado,
                alimentacion: data.alimentacion,
                categoria: data.categoria,
                raza: data.raza,
                foto: data.foto,
                titulo: data.titulo,
                ciudad: data.ciudad,
                antiparasitario: data.antiparasitario,
                aprendizaje: data.aprendizaje,
                telefono: data.telefono,
                descripcion: data.descripcion,
                usuarioId: id_usuario,
            },
        })
            .then((res) => console.log("Publicacion creada ", res)) // ⚠️ NOTE: Usar SweetAlert en lugar de alert()
            .catch((err) => console.log(err));

        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        // Contenedor que reemplaza el Navbar/Footer duplicado
        <div
            style={{
                backgroundColor: "#f5f7fa",
                minHeight: "100vh",
                padding: "60px 5vw",
                width: "100%", // Usar 100% en lugar de 99vw
                margin: "0",
            }}
        >
            <Container> {/* Usamos Container de Bootstrap para centrar el Card */}
                <Card
                    className="shadow-lg border-0 p-5 w-100"
                    style={{ maxWidth: "100%" }}
                >
                    <h2 className="text-center mb-4 text-dark">
                        Publicar un animal en adopción
                    </h2>

                    {success && (
                        <Alert variant="success" className="text-center">
                            ¡Anuncio publicado con éxito!
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Categoría y Título */}
                        <Row className="mb-5">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Categoría *</Form.Label>
                                <Controller
                                    name="categoria"
                                    control={control}
                                    rules={{ required: "Selecciona una categoría" }}
                                    render={({ field }) => (
                                        <>
                                            <Form.Select {...field} isInvalid={!!errors.categoria}>
                                                <option value="">Selecciona una categoría</option>
                                                <option value="perro">Perros en adopción</option>
                                                <option value="gato">Gatos en adopción</option>
                                                <option value="otro">Otros animales</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.categoria?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>Título *</Form.Label>
                                <Controller
                                    name="titulo"
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",
                                        minLength: {
                                            value: 5,
                                            message: "El título debe tener al menos 5 caracteres",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "El título no puede exceder 100 caracteres",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Ej. Cachorro busca hogar"
                                                isInvalid={!!errors.titulo}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.titulo?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>
                            
                            {/* NOMBRE */}
                            <Form.Group as={Col} md="4">
                                <Form.Label>Nombre *</Form.Label>
                                <Controller
                                    name="nombre"
                                    control={control}
                                    rules={{
                                        required: "Este campo es obligatorio",
                                        minLength: {
                                            value: 3,
                                            message: "El Nombre debe tener al menos 3 caracteres",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "El nombre no puede exceder 10 caracteres",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Ej. Roki"
                                                isInvalid={!!errors.nombre}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nombre?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>
                        </Row>


                        {/* Ubicación, Imagen y Teléfono */}
                        <Row className="mb-5">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Ubicación *</Form.Label>
                                <Controller
                                    name="ciudad"
                                    control={control}
                                    rules={{ required: "La ubicación es obligatoria" }}
                                    render={({ field }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Ciudad o barrio"
                                                isInvalid={!!errors.ciudad}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.ciudad?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>Imagen del animal *</Form.Label>
                                <Controller
                                    name="foto"
                                    control={control}
                                    rules={{ required: "La imagen es obligatoria" }}
                                    render={({ field }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                type="text"
                                                placeholder="Url de la Imagen"
                                                isInvalid={!!errors.foto}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.foto?.message}
                                            </Form.Control.Feedback>
                                        </>
                                    )}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="4">
                                <Form.Label>Teléfono de contacto *</Form.Label>
                                <Controller
                                    name="telefono"
                                    control={control}
                                    rules={{
                                        required: "El teléfono es obligatorio",
                                        pattern: {
                                            value:
                                                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Ingresá un número válido",
                                        },
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
                        </Row>

{/* Vacunas, Destetado y Esterilizado */}
<Row className="mb-5">

    <Form.Group as={Col} md="4">
        <Form.Label>Vacunas *</Form.Label>
        <Controller
            name="vacunado"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Select {...field} isInvalid={!!errors.vacunado}>
                        <option value="">Selecciona una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.vacunado?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>

    <Form.Group as={Col} md="4">
        <Form.Label>Destetado *</Form.Label>
        <Controller
            name="destetado"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Select {...field} isInvalid={!!errors.destetado}>
                        <option value="">Selecciona una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.destetado?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>

    <Form.Group as={Col} md="4">
        <Form.Label>Esterilizado *</Form.Label>
        <Controller
            name="esterilizado"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Select {...field} isInvalid={!!errors.esterilizado}>
                        <option value="">Selecciona una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.esterilizado?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>

</Row>


                        {/* Alimentación, Raza y Sexo */}
<Row className="mb-5">
    <Form.Group as={Col} md="4">
        <Form.Label>Tipo de alimentación *</Form.Label>
        <Controller
            name="alimentacion"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Select {...field} isInvalid={!!errors.alimentacion}>
                        <option value="">Selecciona una opción</option>
                        <option value="blanda">Comida blanda</option>
                        <option value="leche">Leche materna</option>
                        <option value="pellet">Pellet</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.alimentacion?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>

    <Form.Group as={Col} md="4">
        <Form.Label>Raza *</Form.Label>
        <Controller
            name="raza"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Control
                        {...field}
                        type="text"
                        placeholder="Ej. Mestizo"
                        isInvalid={!!errors.raza}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.raza?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>

    <Form.Group as={Col} md="4">
        <Form.Label>Genero *</Form.Label>
        <Controller
            name="genero"
            control={control}
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
                <>
                    <Form.Select {...field} isInvalid={!!errors.genero}>
                        <option value="">Selecciona una opción</option>
                        <option value="Hembra">Hembra</option>
                        <option value="Macho">Macho</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.genero?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    </Form.Group>
</Row>



                        {/* Edad y Antiparasitario */}
                        <Form.Group as={Col} md="4">
    <Form.Label>Edad (aproximada) *</Form.Label>
    <Controller
        name="edad"
        control={control}
        rules={{ required: "Este campo es obligatorio" }}
        render={({ field }) => (
            <>
                <Form.Control
                    {...field}
                    type="number"
                    placeholder="años"
                    isInvalid={!!errors.edad}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.edad?.message}
                </Form.Control.Feedback>
            </>
        )}
    />
</Form.Group>


                            <Form.Group as={Col} md="4">
    <Form.Label>Antiparasitario *</Form.Label>
    <Controller
        name="antiparasitario"
        control={control}
        rules={{ required: "Este campo es obligatorio" }}
        render={({ field }) => (
            <>
                <Form.Select {...field} isInvalid={!!errors.antiparasitario}>
                    <option value="">Selecciona una opción</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.antiparasitario?.message}
                </Form.Control.Feedback>
            </>
        )}
    />
</Form.Group>

                        {/* Aprendizaje sanitario */}
                        <Form.Group className="mb-5">
    <Form.Label>Aprendizaje sanitario *</Form.Label>
    <Controller
        name="aprendizaje"
        control={control}
        rules={{ required: "Este campo es obligatorio" }}
        render={({ field }) => (
            <>
                <Form.Control
                    {...field}
                    type="text"
                    placeholder="Ej. Hace sus necesidades afuera"
                    isInvalid={!!errors.aprendizaje}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.aprendizaje?.message}
                </Form.Control.Feedback>
            </>
        )}
    />
</Form.Group>


                        {/* Descripción */}
                        <Form.Group className="mb-5">
                            <Form.Label>Descripción *</Form.Label>
                            <Controller
                                name="descripcion"
                                control={control}
                                rules={{
                                    required: "Este campo es obligatorio",
                                    minLength: {
                                        value: 20,
                                        message: "La descripción debe tener al menos 20 caracteres",
                                    },
                                    maxLength: {
                                        value: 1000,
                                        message: "La descripción no puede exceder 1000 caracteres",
                                    },
                                }}
                                render={({ field }) => (
                                    <>
                                        <Form.Control
                                            {...field}
                                            as="textarea"
                                            rows={3}
                                            placeholder="Escribe una breve descripción del animal"
                                            isInvalid={!!errors.descripcion}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.descripcion?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                        </Form.Group>

                        {/* Botones */}
                        <div className="text-center mt-5">
                            <Button type="submit" variant="success" className="me-2 px-4">
                                Publicar Anuncio
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                className="px-4"
                                onClick={() => {
                                    reset();
                                    setSuccess(false);
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
//}