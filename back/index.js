const app  = require("./src/server");
const sequelize = require('./src/database/database');
require('dotenv').config({quiet: true});
const port = process.env.PORT || 3001;

(async() =>{
   try {
      //await sequelize.authenticate(); Para produccion
      await sequelize.sync();
      app.listen(port, console.log("Conexion con DB exitosa escuchando el puerto "+port));
   } catch (error) {
      console.log(error);
   }
})();