const mascotasRoutes = require('./mascotasRoute');

const express = require('express');

const mainRoute = express.Router();

mainRoute.use("/mascotas", mascotasRoutes);

module.exports = mainRoute;