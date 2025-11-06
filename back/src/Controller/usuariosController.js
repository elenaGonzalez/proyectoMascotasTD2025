const Usuario= require('../Models/Usuario');
const bcrypt = require('bcrypt');

const postUsuarioController = async(nombre, apellido, email, contrasena, telefono, role) =>{
    if (!nombre || !apellido || !email || !contrasena || !telefono) {
        throw new Error("Los datos estan incompletos")
    }

    const usuarioExistente = await Usuario.findOne({
        where:{email}
   });
  
  if (usuarioExistente) {
    throw new Error("Usuario ya registrado");
  }

  const hashPassword = await bcrypt.hash(contrasena, 10);
  //console.log(hashPassword);
  
  const nuevoUsuario = await Usuario.create({nombre, apellido, email, contrasena: hashPassword, telefono, role});
  return nuevoUsuario;
}

const getUsuariosController = async() =>{
    return await Usuario.findAll();
}

const getUsuarioController = async(id) =>{
   const usuario = await Usuario.findByPk(id);
   if(!usuario){
    throw new Error("No se encontro el usuario buscado");
   }
   return usuario;
}

const deleteUsuarioController = async(id) => {
    const delete_usuario = { activo: false };

    //Hago baja logica
    const borrar_usuario = await Usuario.update(delete_usuario, {
        where: { id }
        });
    if(!borrar_usuario){
        throw new Error("Usuario no encontrado");
    }
    const usuario_borrado = await Usuario.findByPk(id);
    return usuario_borrado;
}

const putUsuarioController = async(id, nombre, apellido, telefono)=>{
  const datos_actualizados = {nombre, apellido, telefono};
    await Usuario.update( datos_actualizados, {
        where: { id }
});
   const usuario_actualizado = await Usuario.findByPk(id);
   return usuario_actualizado;
}

module.exports={
     postUsuarioController,
     getUsuariosController,
     deleteUsuarioController,
     getUsuarioController,
     putUsuarioController
}