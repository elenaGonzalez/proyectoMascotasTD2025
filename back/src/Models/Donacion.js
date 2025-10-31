const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require("../database/database");
const Usuario = require('./Usuario');

const Donacion = sequelize.define(
  'donaciones',
  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
   fecha: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  monto:{
    type: DataTypes.DECIMAL,
    required: true
  }
  },
  {
    timestamps: false,
  },
);

console.log(Donacion === sequelize.models.Donacion); // true
module.exports = Donacion;