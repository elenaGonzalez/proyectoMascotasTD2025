const express = require('express');
const cors = require('cors'); // ⬅️ 1. Importar el módulo CORS

const app = express();

// ⬅️ 2. Aplicar el middleware CORS
app.use(cors()); 

app.use(express.json());

const mainRoute = require('./Routes/mainRoute.js');

app.use('/api', mainRoute);

module.exports = app;