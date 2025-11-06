const Donacion = require("../Models/Donacion");
const Usuario = require("../Models/Usuario");

const getDonacionesController = async()=>{
   const donaciones = await Donacion.findAll();
    
   if(donaciones == []){
        return ("No se registran donaciones")
    }
    return donaciones;
}

const getDonacionController = async(id)=>{
   const donacion_buscada = await Donacion.findByPk(id);
   
   return donacion_buscada;
}

const postDonacionController = async(monto, usuarioId )=>{

const donacion_nueva = await Donacion.create({
        monto,
        usuarioId
    });
    
    return donacion_nueva;
}


module.exports = {
    getDonacionController,
    getDonacionesController,
    postDonacionController,
}







