const app  = require("./src/server");
const sequelize = require('./src/database/database');
require('./src/Models/Usuario.js');
require('./src/Models/Mascota.js');
require('./src/Models/Publicacion.js');
require('./src/Models/Donacion.js');

require('dotenv').config({quiet: true});
const port = process.env.PORT || 3001;

(async() =>{
   try {
      //await sequelize.authenticate(); Para produccion
       await sequelize.sync({ force: false });
      app.listen(port, console.log("Conexion con DB exitosa escuchando el puerto "+port));
   } catch (error) {
      console.log(error);
   }
})();