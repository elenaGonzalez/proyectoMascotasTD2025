const { log } = require("console");
const {
  getPublicacionController,
  getPublicacionesController,
  postPublicacionController,
  putPublicacionController,
  deletePublicacionController,
  postPublicacionesFilterController,
  postCambiarStatusPublicacionController,
  getPublicacionesParaAdminController,
  getPublicacionPorMascotaController
} = require("../Controller/publicacionesController");

const getPublicacionPorMascotaHandler = async(req, res) => {
   const { mascotaId } = req.params;
   console.log("en mascota handler x publi");
   
  try {
    let publicacion_mascota = await getPublicacionPorMascotaController(mascotaId);
    console.log(publicacion_mascota);
    
    res.status(200).send(publicacion_mascota);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
}

const getPublicacionesParaAdminHandler = async(req, res) =>{
  let limit = req.params.limit;
  let page = req.params.page - 1;
  const {role} = req.body;
   try {
    let offset = page * limit;
    let publicaciones_admin = await getPublicacionesParaAdminController(limit, offset, role);
     res.status(200).send(publicaciones_admin);
   } catch (error) {
     res.status(500).send({ Error: error.message });
   }
}
const postCambiarStatusPublicacionHandler = async(req, res) =>{
const {id, disponible} = req.body;
   try{
    let publicacionStatus = await postCambiarStatusPublicacionController(id, disponible);
    res.status(200).send(publicacionStatus);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const getPublicacionesFilterHandler = async (req, res) => {
  let limit = req.params.limit;
  let page = req.params.page - 1;
  
  const {categoria, genero, edad , vacunado, destetado, esterilizado, alimentacion, antiparacitario} = req.body;
  try {
    let offset = page * limit;
    let publicaciones = await postPublicacionesFilterController(offset, limit, categoria, genero, edad , vacunado, destetado, esterilizado, alimentacion, antiparacitario);
    res.status(200).send(publicaciones);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};


const getPublicacionesHandler = async (req, res) => {
  let limit = req.params.limit;
  let page = req.params.page - 1;
  try {
    let offset = page * limit;
    let publicaciones = await getPublicacionesController(offset, limit);
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
    const {titulo, descripcion, telefono, nombre, genero, edad, vacunado, destetado, esterilizado, alimentacion, categoria, raza, foto, ciudad, antiparacitario,aprendizaje, usuarioId} = req.body;
    
    const publicacion = await postPublicacionController(titulo, descripcion, telefono, nombre, genero, edad, vacunado,  destetado, esterilizado, alimentacion, categoria, raza, foto, ciudad, antiparacitario, aprendizaje, usuarioId);
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
    destetado, 
    esterilizado, 
    alimentacion,
    raza,
    foto,
    ciudad,
    antiparacitario,
    aprendizaje,
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
    destetado, 
    esterilizado, 
    alimentacion,
    raza,
    foto,
    ciudad,
    antiparacitario,
    aprendizaje,
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
  getPublicacionesFilterHandler,
  postCambiarStatusPublicacionHandler,
  getPublicacionesParaAdminHandler, 
  getPublicacionPorMascotaHandler
};
