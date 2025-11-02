const express = require('express');

const app = express();
app.use(express.json());

const mainRoute = require('./Routes/mainRoute.js');

app.use('/api', mainRoute);

module.exports = app;