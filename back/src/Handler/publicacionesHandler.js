const {
  getPublicacionController,
  getPublicacionesController,
  postPublicacionController,
  putPublicacionController,
  deletePublicacionController,
} = require("../Controller/publicacionesController");

const getPublicacionesHandler = async (req, res) => {
  try {
    let publicaciones = await getPublicacionesController();
    res.status(200).send(publicaciones);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const getPublicacionHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let publicacion_buscada = await getPublicacionController(id);
    res.status(200).send(publicacion_buscada);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const postPublicacionHandler = async (req, res) => {
  try {
    const {titulo, descripcion, telefono, nombre, genero, edad, vacunado, raza, foto, ciudad} = req.body;
    const publicacion = await postPublicacionController(titulo, descripcion, telefono, nombre, genero, edad, vacunado, raza, foto, ciudad);
    res.status(200).send(publicacion);
} catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const putPublicacionHandler = async (req, res) => {
  const {
    id,
    titulo,
    descripcion,
    telefono,
    nombre,
    genero,
    edad,
    vacunado,
    raza,
    foto,
    ciudad,
  } = req.body;
    try {
    let publicaciones = await putPublicacionController(
    id, 
    titulo, 
    descripcion,
    telefono,
    nombre,
    genero,
    edad,
    vacunado,
    raza,
    foto,
    ciudad,
  );
    res.status(200).send(publicaciones);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const deletePublicacionHandler = async (req, res) => {
  const { id } = req.body;
  try {
    let publicacion_eliminar = await deletePublicacionController(id);
    res.status(200).send(publicacion_eliminar);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

module.exports = {
  getPublicacionHandler,
  getPublicacionesHandler,
  postPublicacionHandler,
  putPublicacionHandler,
  deletePublicacionHandler,
};
