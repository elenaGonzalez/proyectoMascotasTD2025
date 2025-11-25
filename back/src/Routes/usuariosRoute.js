const {Router} = require('express');
const {
   getUsuariosHandler,
   getUsuarioHandler,
   postUsuarioHandler,
   putUsuarioHandler,
   deleteUsuarioHandler,
   postReactivarUsuarioHandler,
   postUsuarioCambioRolHandler
} = require('../Handler/usuariosHandler');



const usuariosRoute = Router();

usuariosRoute.get('/', getUsuariosHandler);
usuariosRoute.get('/:id', getUsuarioHandler);
usuariosRoute.post('/', postUsuarioHandler);
usuariosRoute.post('/cambiarstatus', postReactivarUsuarioHandler);
usuariosRoute.post('/promover/degradar', postUsuarioCambioRolHandler);
usuariosRoute.put('/', putUsuarioHandler);
usuariosRoute.delete('/', deleteUsuarioHandler);

module.exports =  usuariosRoute;