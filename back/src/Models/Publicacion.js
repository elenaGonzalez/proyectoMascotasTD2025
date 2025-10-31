const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require("../database/database");
const Mascota = require('./Mascota');

const Publicacion = sequelize.define(
   'publicaciones',
  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  telefono: {
    type: DataTypes.STRING,
    required: true,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
   disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
   }
  },
  {
    timestamps: false,
  },
);


console.log(Publicacion === sequelize.models.Publicacion); // true
module.exports = Publicacion;