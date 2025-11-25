const Usuario = require('../Models/Usuario');

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const mySecretKey = process.env.mySecretKey;

const registroController = async(nombre, apellido, email, contrasena, telefono) => {
  
  const usuarioExiste = await Usuario.findOne({
    where:{email}
});
  
  if (usuarioExiste) {
    throw new Error("Usuario ya registrado");
  }
  
  const hashPassword = await bcrypt.hash(contrasena, 10);
  
  const usuarioNuevo = await Usuario.create({ 
    nombre, 
    apellido, 
    email, 
    contrasena: hashPassword, 
    telefono
  });
  
  return usuarioNuevo;
};

const loginController = async (email, contrasena) => {
  let usuario = await Usuario.findOne({
     where:{email}
    });
  
  if (!usuario) {
    throw new Error("El usuario no esta registrado");
  }
  
    if(!usuario.activo){
      throw new Error("El usuario esta bloqueado. Contacta al administrador.");
    }
  const passMatch = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!passMatch) {
    throw new Error("Contrasena incorrecta");
  }

  const token = jwt.sign({ id: usuario.id, role: usuario.role }, mySecretKey, {
    expiresIn: "1h",
  });

  let { id, nombre, apellido, role } = usuario;


  return {message : "Login " , token, id, nombre, apellido, role};
};

module.exports = {
  registroController,
  loginController,
};
