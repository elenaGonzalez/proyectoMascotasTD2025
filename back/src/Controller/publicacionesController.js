const {postMascotaController} = require("./mascotasController");
const Publicacion = require("../Models/Publicacion");
const Mascota = require("../Models/Mascota");

const getPublicacionController = async(id)=>{
   const publicacion_bus = await Publicacion.findByPk(id);
   
   return publicacion_bus;
}

const getPublicacionesController = async()=>{
    return await Publicacion.findAll({
      include: [
        {
          model: Mascota,
          as: 'mascota',
          attributes: ['id', 'nombre', 'genero', 'edad', 'vacunado', 'raza', 'foto', 'ciudad', 'usuarioId'], 
        }]
});
}

const postPublicacionController = async(titulo, descripcion, telefono, nombre, genero, edad, vacunado, raza, foto, ciudad)=>{
  //deberia guardar el id del usuario que crea la publicacion

  let mascota_new = await postMascotaController(nombre, genero, edad, vacunado, raza, foto, ciudad);
  console.log("Soy mascota new ", mascota_new.id);
  
  let publicacion_mascota = await Publicacion.create({
    titulo,
    descripcion,
    telefono,
    mascotaId : mascota_new.id
  });

  return publicacion_mascota;
  
}

const putPublicacionController = async()=>{

}


const deletePublicacionController = async() =>{

}


module.exports ={
  getPublicacionController,
  getPublicacionesController,
  postPublicacionController,
  putPublicacionController,
  deletePublicacionController,
}