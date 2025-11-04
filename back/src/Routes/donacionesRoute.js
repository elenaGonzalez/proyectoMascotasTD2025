const { Router } = require("express")

const{
    getDonacionesHandler,
    getDonacionHandler,
    postDonacionHandler
} = require("../Handler/donacionesHandler")

const donacionesRoutes = Router();

donacionesRoutes.get('/', getDonacionesHandler);
donacionesRoutes.get('/:id', getDonacionHandler);
donacionesRoutes.post('/', postDonacionHandler);

module.exports= donacionesRoutes;