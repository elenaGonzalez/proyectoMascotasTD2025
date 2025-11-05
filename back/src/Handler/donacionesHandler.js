const {
     getDonacionesController,
     getDonacionController,
     postDonacionController, 
    } = require("../Controller/donacionesController");

const getDonacionesHandler = async (req, res) => {
    try {
        let donaciones_recibidas = await getDonacionesController();
        res.status(200).send(donaciones_recibidas);
    } catch (error) {
         res.status(500).send({ Error: error.message });
    }
};

const getDonacionHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let donacion = await getDonacionController(
      id,
    );
    res.status(200).send(donacion);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const postDonacionHandler = async (req, res) => {
    const {monto, usuarioId} = req.body;
    try {
       let nueva_donacion = await postDonacionController(monto, usuarioId);
       res.status(200).send(nueva_donacion);
    } catch (error) {
        res.status(500).send({ Error: error.message });
    }
};

module.exports = {
  getDonacionesHandler,
  getDonacionHandler,
  postDonacionHandler,
};
