const {
  getUsuarioController,
  getUsuariosController,
  postUsuarioController,
  deleteUsuarioController,
  putUsuarioController,
  postUsuarioCambioStatusController,
  postUsuarioCambioRolController
} = require("../Controller/usuariosController");

const postUsuarioCambioRolHandler = async(req, res) =>{
   const { id, role } = req.body;
  try {
    const usuario_cambiado = await postUsuarioCambioRolController(id, role);
    res.status(200).send(usuario_cambiado);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
}

const postReactivarUsuarioHandler = async(req, res) =>{
  const { id, activo } = req.body;
  try {
    const usuario_cambia_status = await postUsuarioCambioStatusController(id, activo);
    res.status(200).send(usuario_cambia_status);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
}

const getUsuarioHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await getUsuarioController(id);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const getUsuariosHandler = async (req, res) => {
  try {
    const usuarios = await getUsuariosController();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const postUsuarioHandler = async (req, res) => {
    try {
    let { nombre, apellido, email, contrasena, telefono, role } = req.body;
    role ? role : role = 'usuario';
    const respuesta = await postUsuarioController(nombre, apellido, email, contrasena, telefono, role);
    res.status(201).send(respuesta);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const putUsuarioHandler = async (req, res) => {
  try {
    const { id, nombre, apellido, telefono } = req.body;
    const actualizar_usuario = await putUsuarioController(id, nombre, apellido, telefono);
    res.status(200).send(actualizar_usuario);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const deleteUsuarioHandler = async (req, res) => {
 try {
    const { id } = req.body;
    let usuario_eliminar = await deleteUsuarioController(id);
    res.status(200).send(usuario_eliminar);
  } catch (error) {
     res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  getUsuariosHandler,
  getUsuarioHandler,
  postUsuarioHandler,
  putUsuarioHandler,
  deleteUsuarioHandler,
  postReactivarUsuarioHandler,
  postUsuarioCambioRolHandler
};
