const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const mainRoute = require('./Routes/mainRoute.js');

app.use('/api', mainRoute);

module.exports = app; 