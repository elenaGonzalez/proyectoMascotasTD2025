const {Router} = require('express');
const {
   getUsuariosHandler,
   getUsuarioHandler,
   postUsuarioHandler,
   putUsuarioHandler,
   deleteUsuarioHandler
} = require('../Handler/usuariosHandler');



const usuariosRoute = Router();

usuariosRoute.get('/', getUsuariosHandler);
usuariosRoute.get('/:id', getUsuarioHandler);
usuariosRoute.post('/', postUsuarioHandler);
usuariosRoute.put('/', putUsuarioHandler);
usuariosRoute.delete('/', deleteUsuarioHandler);

module.exports =  usuariosRoute;