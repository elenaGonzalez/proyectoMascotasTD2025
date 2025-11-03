const mascotasRoutes = require('./mascotasRoute');
const usuariosRoutes = require('./usuariosRoute');


const express = require('express');

const mainRoute = express.Router();

mainRoute.use("/mascotas", mascotasRoutes);
mainRoute.use("/usuarios", usuariosRoutes);


module.exports = mainRoute;