const {Router} = require("express");

const{
  getPublicacionHandler,
  getPublicacionesHandler,
  postPublicacionHandler,
  putPublicacionHandler,
  deletePublicacionHandler,
  getPublicacionesFilterHandler,
} = require("../Handler/publicacionesHandler");

const publicacionesRoutes = Router();
publicacionesRoutes.get('/:page/:limit', getPublicacionesHandler);
publicacionesRoutes.get('/:id', getPublicacionHandler);
publicacionesRoutes.post('/', postPublicacionHandler);
publicacionesRoutes.put('/', putPublicacionHandler);
publicacionesRoutes.delete('/', deletePublicacionHandler);
publicacionesRoutes.post('/:page/:limit/filtro', getPublicacionesFilterHandler);

module.exports = publicacionesRoutes;