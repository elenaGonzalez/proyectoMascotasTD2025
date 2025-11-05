const {Router} = require("express");

const{
  getPublicacionHandler,
  getPublicacionesHandler,
  postPublicacionHandler,
  putPublicacionHandler,
  deletePublicacionHandler,
} = require("../Handler/publicacionesHandler");

const publicacionesRoutes = Router();
publicacionesRoutes.get('/', getPublicacionesHandler);
publicacionesRoutes.get('/:id', getPublicacionHandler);
publicacionesRoutes.post('/', postPublicacionHandler);
publicacionesRoutes.put('/', putPublicacionHandler);
publicacionesRoutes.delete('/', deletePublicacionHandler);

module.exports = publicacionesRoutes;