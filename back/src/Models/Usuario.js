const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require("../database/database");
const Mascota = require("./Mascota");
const Donacion = require('./Donacion');

const Usuario = sequelize.define(
  'usuarios',
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
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    isEmail: true, 
  },
  contrasena: {
    type: DataTypes.STRING,
    required: true,
  },
  telefono: {
    type: DataTypes.STRING,
    required: true,
  },
  role: {
    type: DataTypes.STRING,
    enum: ['usuario', 'admin'],
    defaultValue: 'usuario',
  },
   activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
   }
  },
  {
    timestamps: false,
  },
);

Usuario.hasMany(Mascota);
Mascota.belongsTo(Usuario);

Usuario.hasOne(Donacion);
Donacion.belongsTo(Usuario);

module.exports = Usuario;