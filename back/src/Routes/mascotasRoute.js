const {Router} = require('express');
const {
    getMascotasActivasHandler,
    postMascotaHandler,
    getMascotaHandler,
    putMascotaHandler,
    deleteMascotaHandler,
} = require("../Handler/mascotasHandler");

const mascotasRoutes = Router();

mascotasRoutes.get('/', getMascotasActivasHandler);
mascotasRoutes.get('/:id', getMascotaHandler);
mascotasRoutes.post('/', postMascotaHandler);
mascotasRoutes.put('/:id', putMascotaHandler);
mascotasRoutes.delete('/:id', deleteMascotaHandler);


module.exports= mascotasRoutes;