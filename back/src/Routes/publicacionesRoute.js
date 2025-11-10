const {Router} = require("express");

const{
  getPublicacionHandler,
  getPublicacionesHandler,
  postPublicacionHandler,
  putPublicacionHandler,
  deletePublicacionHandler,
  getPublicacionCardsHandler,
} = require("../Handler/publicacionesHandler");

const publicacionesRoutes = Router();
publicacionesRoutes.get('/', getPublicacionesHandler);
publicacionesRoutes.get('/:id', getPublicacionHandler);
publicacionesRoutes.post('/', postPublicacionHandler);
publicacionesRoutes.put('/', putPublicacionHandler);
publicacionesRoutes.delete('/', deletePublicacionHandler);
publicacionesRoutes.get('/mascotas/home', getPublicacionCardsHandler);

module.exports = publicacionesRoutes;