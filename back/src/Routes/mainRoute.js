const mascotasRoutes = require('./mascotasRoute');
const usuariosRoutes = require('./usuariosRoute');
const donacionesRoutes = require('./donacionesRoute');

const express = require('express');

const mainRoute = express.Router();

mainRoute.use("/mascotas", mascotasRoutes);
mainRoute.use("/usuarios", usuariosRoutes);
mainRoute.use("/donaciones", donacionesRoutes);


module.exports = mainRoute;