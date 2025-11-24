const {
  postMascotaController,
  deleteMascotaController,
  putMascotaController,
} = require("./mascotasController");
const Publicacion = require("../Models/Publicacion");
const Mascota = require("../Models/Mascota");
const Usuario = require("../Models/Usuario");

const { Op } = require("@sequelize/core");
const {
  attribute,
} = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");

const parseBoolean = (value) => {
  if (value === true || value === "true" || value === 1 || value === "1") return true;
  if (value === false || value === "false" || value === 0 || value === "0") return false;
  return undefined;
};

const getPublicacionController = async (id) => {
  const publicacion_bus = await Publicacion.findOne({
    where: { id },
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
        include: [
          {
            model: Usuario,
            attributes: ["nombre", "apellido", "email", "telefono"]
          }
        ]
      },
    ],
  });

  return publicacion_bus;
};

const postPublicacionesFilterController = async (
  offset,
  limit,
  categoria,
  genero,
  edad,
  vacunado,
  destetado,
  esterilizado,
  alimentacion, 
  antiparacitario
) => {
  const mascota_query_options = {
    model: Mascota,
    as: "mascota",
    required: true, // Aplica el filtro en el INNER JOIN.
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
    where: {},
  };

  if (categoria) {
    mascota_query_options.where.categoria = { [Op.like]: `%${categoria}%` };
  }

  if (genero) {
    mascota_query_options.where.genero = genero;
  }

  if (edad) {
    mascota_query_options.where.edad = edad;
  }

  if(alimentacion){
    mascota_query_options.where.alimentacion = { [Op.like]: `%${alimentacion}%` };;
  } 

const vac = parseBoolean(vacunado);
  if (vac !== undefined) mascota_query_options.where.vacunado = vac;

  const des = parseBoolean(destetado);
  if (des !== undefined) mascota_query_options.where.destetado = des;

  const est = parseBoolean(esterilizado);
  if (est !== undefined) mascota_query_options.where.esterilizado = est;

  const anti = parseBoolean(antiparacitario);
  if (anti !== undefined) mascota_query_options.where.antiparacitario = anti;

  return Publicacion.findAndCountAll({
    include: [mascota_query_options],
    offset,
    limit,
    distinct: true,
  });
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
        include: [
          {
            model: Usuario,
             attributes: [
               "nombre",
               "apellido",
               "email",
             ]
          }
        ]
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
    mascotaId: mascota_new.id,
  });

  let publicacion_creada = await Publicacion.findByPk(publicacion_mascota.id, {
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
  });

  return publicacion_creada;
};

const putPublicacionController = async (
  id,
  titulo,
  descripcion,
  telefono,
  mascotaId,
  nombre,
  genero,
  edad,
  vacunado,
  destetado,
  esterilizado,
  alimentacion,
  raza,
  foto,
  ciudad
) => {
  const publicacion_actualizada = {
    id,
    titulo,
    descripcion,
    telefono,
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

const deletePublicacionController = async (mascotaId) => {
  const publicacion_eliminar = await Publicacion.findOne({
    where:{
      mascotaId
    }
  });
  await deleteMascotaController(mascotaId);
  await Publicacion.destroy({
    where: {
      id: publicacion_eliminar.id,
    },
  });
  return { mensaje: "Publicacion eliminada" };
};

module.exports = {
  getPublicacionController,
  getPublicacionesController,
  postPublicacionController,
  putPublicacionController,
  deletePublicacionController,
  postPublicacionesFilterController,
};
