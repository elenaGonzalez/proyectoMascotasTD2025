const express = require('express');
<<<<<<< HEAD
const cors = require('cors'); // ⬅️ 1. Importar el módulo CORS

const app = express();

// ⬅️ 2. Aplicar el middleware CORS
app.use(cors()); 

=======
const cors = require('cors');
const app = express();

>>>>>>> development
app.use(express.json());
app.use(cors());

app.use(cors()); 


const mainRoute = require('./Routes/mainRoute.js');

app.use('/api', mainRoute);

module.exports = app; 