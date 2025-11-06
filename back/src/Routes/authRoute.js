const {Router} = require('express');
const {
    registroHandler,
    loginHandler,
} = require('../Handler/authHandler');

const authRoutes = Router();

authRoutes.post('/registro', registroHandler);   
authRoutes.post('/login', loginHandler);


module.exports = authRoutes;