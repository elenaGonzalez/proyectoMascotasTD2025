const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require("../database/database");
const Publicacion = require('./Publicacion');

console.debug('Marcota define');
const Mascota = sequelize.define(
  'mascotas',
  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
    type: DataTypes.INTEGER,
    required: true,
  },
   vacunado: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  destetado: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  esterilizado:{
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: false,
  },
  alimentacion:{
    type: DataTypes.STRING,
    required: true,
    defaultValue: false,
    },
  categoria: {
    type: DataTypes.STRING,
    enum: ['perro', 'gato', 'otro'],
    defaultValue: 'otro',
  },
  raza: {
    type: DataTypes.STRING,
    required: true,
    defaultValue: 'Mestizo',
  },
  foto: {
    type: DataTypes.STRING,
    required: true,
  },
  ciudad: {
    type: DataTypes.STRING,
    required: true,
  },
  antiparacitario:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  aprendizaje:{
    type: DataTypes.STRING,
    required: true,
  },
  adoptado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   },
  },
  {
    timestamps: false,
  },
);
console.log(Mascota === sequelize.models.Mascota); // true

Mascota.hasOne(Publicacion);
Publicacion.belongsTo(Mascota);
module.exports = Mascota;