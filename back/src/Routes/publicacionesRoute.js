const {Router} = require("express");

const{
  getPublicacionHandler,
  getPublicacionesHandler,
  postPublicacionHandler,
  putPublicacionHandler,
  deletePublicacionHandler,
  getPublicacionesFilterHandler,
  postCambiarStatusPublicacionHandler,
  getPublicacionesParaAdminHandler,
  getPublicacionPorMascotaHandler
} = require("../Handler/publicacionesHandler");

const publicacionesRoutes = Router();
publicacionesRoutes.get('/:page/:limit', getPublicacionesHandler);
publicacionesRoutes.get('/:id', getPublicacionHandler);
publicacionesRoutes.get('/mascota/publicada/:mascotaId', getPublicacionPorMascotaHandler);
publicacionesRoutes.post('/admin/:page/:limit', getPublicacionesParaAdminHandler);
publicacionesRoutes.post('/', postPublicacionHandler);
publicacionesRoutes.put('/', putPublicacionHandler);
publicacionesRoutes.delete('/', deletePublicacionHandler);
publicacionesRoutes.post('/:page/:limit/filtro', getPublicacionesFilterHandler);
publicacionesRoutes.post('/cambiar/status', postCambiarStatusPublicacionHandler);


module.exports = publicacionesRoutes;