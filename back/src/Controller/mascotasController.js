const Mascota = require("../Models/Mascota");
const Usuario = require("../Models/Usuario");
//const Usuario = require("../Models/Usuario");

const getMascotasActivasController = async() =>{
    return await Mascota.findAll();
}

const postMascotaController = async(nombre, genero, edad, vacunado, destetado, esterilizado, alimentacion, categoria, raza, foto, ciudad, antiparacitario, aprendizaje, usuarioId)=>{
  const user = await Usuario.findOne({usuarioId: usuarioId});  
  console.info("usuario:", user)
  const mascota_nueva = await Mascota.create({
        nombre, 
        genero, 
        edad, 
        vacunado,
        destetado, 
        esterilizado, 
        alimentacion,
        categoria,
        raza,
        foto,
        ciudad,
        antiparacitario,
        aprendizaje,
        usuarioId: user.id,
    });
    
    return mascota_nueva;
}

const getMascotaController = async(id)=>{
   const mascota_buscada = await Mascota.findByPk(id);
   
   return mascota_buscada;
}

const putMascotaController = async(id, nombre, genero, edad, vacunado, destetado, esterilizado, alimentacion, categoria, raza, foto, ciudad, adoptado, usuarioId) =>{
  const mascota_actualizada = {nombre, genero, edad, vacunado, destetado, esterilizado, alimentacion, categoria, raza, foto, ciudad, adoptado, usuarioId};
   await Mascota.update( mascota_actualizada, {
        where: { id }
});
  return await Mascota.findByPk(id);
}

const deleteMascotaController = async(id)=>{
  let masconta_eliminar = await Mascota.findByPk(id);
  await Mascota.destroy({
  where: {
    id: id
  }
});
   return masconta_eliminar;
}

module.exports = {
    getMascotasActivasController,
    postMascotaController,
    getMascotaController,
    putMascotaController,
    deleteMascotaController,
}