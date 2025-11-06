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
mascotasRoutes.put('/', putMascotaHandler);
mascotasRoutes.delete('/', deleteMascotaHandler);


module.exports= mascotasRoutes;