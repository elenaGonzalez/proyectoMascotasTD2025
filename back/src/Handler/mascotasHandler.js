const {
   getMascotasActivasController,
   postMascotaController,
   getMascotaController,
   putMascotaController,
   deleteMascotaController
} = require("../Controller/mascotasController");


const getMascotasActivasHandler = async(req,res)=>{
     try {
    let mascotas = await getMascotasActivasController();
     if (!mascotas || mascotas.length === 0) {
        return res.status(404).send("No hay mascotas disponibles");
      }
    res.status(200).send(mascotas);
  } catch (error) {
     res.status(500).send("Error inesperado. Intente nuevamente mas tarde.");
};
}

const postMascotaHandler = async(req, res) =>{
   const { nombre, genero, edad, vacunado, raza, foto, ciudad , usuarioId} = req.body;
   try {
      let nueva_mascota = await postMascotaController(nombre, genero, edad, vacunado, raza, foto, ciudad, usuarioId);
      res.status(200).send(nueva_mascota);
   } catch (error) {
      res.status(500).send("Error al intentar guardar una mascota")
   }
}

const getMascotaHandler = async(req,res)=>{
    const {id} = req.params;
     try {
    let mascota_id = await getMascotaController(id);
    
     if (mascota_id === null) {
          return res.status(404).send("Mascota no encontrada");
        }
    res.send(mascota_id);
    
  } catch (error) {
     res.status(500).send("Error inesperado. Vuelva a intentar mas tarde");
  }
}

const putMascotaHandler = async(req, res) => {
  try {
    const {id} = req.params;
    const { nombre, genero, edad, vacunado, raza, foto, ciudad, adoptado, usuarioId } = req.body;
    let mascotaUpdate= await putMascotaController(id, nombre, genero, edad, vacunado, raza, foto, ciudad, adoptado, usuarioId);  
    res.send(mascotaUpdate);
  } catch (error) {
     res.status(500).send({ Error: error.message });
  }
};

const deleteMascotaHandler = async(req, res) =>{
   try {
      let {id} = req.params;
      let delete_mascota = await deleteMascotaController(id);
      res.send(delete_mascota);
   } catch (error) {
      res.status(500).send({Error: error.message});
   }
}

module.exports = {
 getMascotasActivasHandler,
 postMascotaHandler,
 getMascotaHandler,
 putMascotaHandler,
 deleteMascotaHandler,
}