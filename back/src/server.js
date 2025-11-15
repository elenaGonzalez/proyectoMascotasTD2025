const express = require('express');
const cors = require('cors'); // Importación de CORS (que usted instaló)

const app = express();

// Middleware: Configuración de CORS y manejo de JSON
app.use(cors()); // Permite que el front-end (puerto 5173) acceda a la API
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones en formato JSON

const mainRoute = require('./Routes/mainRoute.js');

// Configuración de la ruta base para la API
app.use('/api', mainRoute);

module.exports = app;