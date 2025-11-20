const {
  postMascotaController,
  deleteMascotaController,
  putMascotaController,
} = require("./mascotasController");
const Publicacion = require("../Models/Publicacion");
const Mascota = require("../Models/Mascota");
const Usuario = require("../Models/Usuario");

const getPublicacionController = async (id) => {
  const publicacion_bus = await Publicacion.findByPk(id);

  return publicacion_bus;
};

const getPublicacionesController = async (offset, limit) => {
  
  return await Publicacion.findAndCountAll({
    include: [
      {
        model: Mascota,
        as: "mascota",
        attributes: [
          "id",
          "nombre",
          "genero",
          "edad",
          "vacunado",
          "destetado", 
          "esterilizado", 
          "alimentacion",
          "categoria",
          "raza",
          "foto",
          "ciudad",
          "antiparacitario",
          "aprendizaje",
          "usuarioId",
        ],
      },
    ],
    offset,
    limit,
  });
};

const postPublicacionController = async (
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
  categoria,
  raza,
  foto,
  ciudad,
  antiparacitario,
  aprendizaje,
  usuarioId
) => {
   let usuario = await Usuario.findByPk(usuarioId);
  
  if (!usuario) {
    throw new Error("El usuario no esta registrado");
  }
  

  let mascota_new = await postMascotaController(
    nombre,
    genero,
    edad,
    vacunado,
    destetado, 
    esterilizado, 
    alimentacion,
    categoria,
    raza,
    foto,
    ciudad,
    antiparacitario,
    aprendizaje,
    usuarioId
  );

  let publicacion_mascota = await Publicacion.create({
    titulo,
    descripcion,
    telefono,
    mascotaId: mascota_new.id
  });
   
  let publicacion_creada = await Publicacion.findByPk(
    publicacion_mascota.id, 
    {
    include: [
      {
        model: Mascota,
        as: "mascota",
        attributes: [
          "id",
          "nombre",
          "genero",
          "edad",
          "vacunado",
          "destetado", 
          "esterilizado", 
          "alimentacion",
          "categoria",
          "raza",
          "foto",
          "ciudad",
          "antiparacitario",
          "aprendizaje",
          "usuarioId",
        ],
      },
    ],
  }
  );

  return publicacion_creada;
};

const putPublicacionController = async (id, titulo, descripcion,telefono, mascotaId, nombre, genero, edad, vacunado, destetado, esterilizado, alimentacion, raza, foto, ciudad) => {
  const publicacion_actualizada = {
    id,
    titulo,
    descripcion,
    telefono
  };
  await Publicacion.update(publicacion_actualizada, {
    where: { id },
  });

  const publicacion_ac = await Publicacion.findByPk(id);
  await putMascotaController(
    publicacion_ac.mascotaId,
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
    aprendizaje
  );
  const actualizado = await Publicacion.findByPk(id, {
    include: [
      {
        model: Mascota,
        as: "mascota",
        attributes: [
          "nombre",
          "genero",
          "edad",
          "vacunado",
          "destetado", 
          "esterilizado", 
          "alimentacion",
          "raza",
          "foto",
          "ciudad",
          "antiparacitario",
          "aprendizaje",
          "usuarioId",
        ],
      },
    ],
  });
  return actualizado;
};

const deletePublicacionController = async (id) => {
  const publicacion_eliminar = await Publicacion.findByPk(id);
  await deleteMascotaController(publicacion_eliminar.mascotaId);
  await Publicacion.destroy({
   where: {
    id: id
  }
  });
  return { "mensaje": "Publicacion eliminada" };
};

module.exports = {
  getPublicacionController,
  getPublicacionesController,
  postPublicacionController,
  putPublicacionController,
  deletePublicacionController,
  //getPublicacionCardsController
};
