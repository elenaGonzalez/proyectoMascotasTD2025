const authRoutes = require('./authRoute');
const mascotasRoutes = require('./mascotasRoute');
const usuariosRoutes = require('./usuariosRoute');
const donacionesRoutes = require('./donacionesRoute');
const publicacionesRoutes = require('./publicacionesRoute');


const express = require('express');

const mainRoute = express.Router();

mainRoute.use("/mascotas", mascotasRoutes);
mainRoute.use("/usuarios", usuariosRoutes);
mainRoute.use("/donaciones", donacionesRoutes);
mainRoute.use("/publicaciones", publicacionesRoutes);
mainRoute.use("/auth", authRoutes);

module.exports = mainRoute;