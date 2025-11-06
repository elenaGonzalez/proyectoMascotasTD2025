## Rutas del Back
### Usuarios

- GET http://localhost:3000/usuarios:
    - Retorna todos los usuarios de la BD en un array de objetos.No requiere pasarle ningun parametro. Ej de respuesta:
    ~~~
    [
    {
        "id": "35d8ec43-addd-4cdb-82a0-5a36438b2049",
        "nombre": "Maria",
        "apellido": "Gonzalez",
        "email": "maria@gmail.com",
        "contrasena": "$2b$10$3e6uojEfB05wQDDUszVr4.p/pC.2mkbv6vsZj7ukHDa7p2c8Skz7W",
        "telefono": "11111111000",
        "role": "usuario",
        "activo": true
    },
    {
        "id": "c23d1e5b-5a89-4794-aaf5-691f65f4826c",
        "nombre": "Ele",
        "apellido": "Gonzalez",
        "email": "ele@gmail.com",
        "contrasena": "$2b$10$RlRYUnu6P19mxpKQwcg4leaqWlbkAUMnHRXo97C2TXvDiO7oqN2Uu",
        "telefono": "11111111011",
        "role": "admin",
        "activo": true
    }
    ]
    ~~~
- GET http://localhost:3000/usuarios/${id}
    - Recibe un id de usuario y retorna un objeto con la informacion de dicho usuario. Ej:
    ~~~
    {
        "id": "35d8ec43-addd-4cdb-82a0-5a36438b2049",
        "nombre": "Maria",
        "apellido": "Gonzalez",
        "email": "maria@gmail.com",
        "contrasena": "$2b$10$3e6uojEfB05wQDDUszVr4.p/pC.2mkbv6vsZj7ukHDa7p2c8Skz7W",
        "telefono": "11111111000",
        "role": "usuario",
        "activo": true
    }
    ~~~
-  POST http://localhost:3000/usuarios
    - Ruta para crear un nuevo usuario. Si no se le pasa el campo role, el usuario se crea con el role "usuario" por defecto. 
    
    Los campos que se le deben pasar son los que se ven en el siguiente ejemplo:
    ~~~
    {
    "nombre": "Lorena",
    "apellido": "Suarez",
    "email": "lore@gmail.com",
    "contrasena": "1234",
    "telefono": "1111111156"
    }
    ~~~
    La ruta retorna un objeto con el usuario creado.
- PUT http://localhost:3000/usuarios
    - Recibe un id de usuario en la ruta de llama, en el body, junto con los datos que se desea modificar. Ej:
    ~~~
    {
      "id" : "35d8ec43-addd-4cdb-82a0-5a36438b2049",
      "nombre": "Renata",
      "telefono" : "5551111156"
    }
    ~~~
    Retorna un objeto con la informacion del usuario, que tiene la informacion modificada. Ej de respuesta:

     ~~~
    {
        "id": "35d8ec43-addd-4cdb-82a0-5a36438b2049",
        "nombre": "Renata",
        "apellido": "Gonzalez",
        "email": "maria@gmail.com",
        "contrasena": "$2b$10$3e6uojEfB05wQDDUszVr4.p/pC.2mkbv6vsZj7ukHDa7p2c8Skz7W",
        "telefono": "5551111156",
        "role": "usuario",
        "activo": true
    }
    ~~~

- DELETE http://localhost:3000/usuarios
    - Recibe el id de usuario que se desea eliminar. El usuario no se elimina de la BD, se procede a darlo de baja logica ( el campo activo toma el valor false). 
   
     ~~~
    {
      "id" : "35d8ec43-addd-4cdb-82a0-5a36438b2049"
    }
    ~~~
    Retorna un objeto con la informacion de dicho usuario dado de baja logica ( es decir, con el campo activo en false). Ej de salida:
     ~~~
    {
        "id": "35d8ec43-addd-4cdb-82a0-5a36438b2049",
        "nombre": "Renata",
        "apellido": "Gonzalez",
        "email": "maria@gmail.com",
        "contrasena": "$2b$10$3e6uojEfB05wQDDUszVr4.p/pC.2mkbv6vsZj7ukHDa7p2c8Skz7W",
        "telefono": "5551111156",
        "role": "usuario",
        "activo": true
    }
    ~~~