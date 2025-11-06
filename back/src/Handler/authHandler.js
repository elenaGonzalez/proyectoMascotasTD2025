const {
  loginController,
  registroController,
} = require("../Controller/authController");

const registroHandler = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena, telefono } = req.body;
    const registro = await registroController(
      nombre,
      apellido,
      email,
      contrasena,
      telefono
    );
    
    res.status(201).send(registro);
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const sesion = await loginController(email, contrasena);
    res.status(200).send(sesion);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  registroHandler,
  loginHandler,
};
