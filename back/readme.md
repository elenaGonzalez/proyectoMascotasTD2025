## Rutas del Back
### Usuarios

- GET http://localhost:3000/api/usuarios:
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
- GET http://localhost:3000/api/usuarios/${id}
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
-  POST http://localhost:3000/api/usuarios
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
- PUT http://localhost:3000/api/usuarios
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

- DELETE http://localhost:3000/api/usuarios
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
### Publicaciones

- GET http://localhost:3000/api/publicaciones:
    - Retorna todas las publicaciones de la BD en un array de objetos.No requiere pasarle ningun parametro. Ej de respuesta:
    ~~~
    [
    {
        "id": "42cd2f28-08c0-4666-9774-d91381adc572",
        "titulo": "Publciacion de Uli",
        "descripcion": "Soy muy cariñoso y agradecido, me sacaron de una situacion de maltrato. Soy super guardian e ideal para ser unico perro ! me llevo muy bien con la gente mayor y con los niños",
        "telefono": "11120202020",
        "fecha_publicacion": "2025-11-05T20:36:31.358Z",
        "disponible": true,
        "mascotaId": "c05f85ae-6918-4852-98a5-0e56bce3a3da",
        "mascota": {
            "id": "c05f85ae-6918-4852-98a5-0e56bce3a3da",
            "nombre": "Ulises",
            "genero": "Macho",
            "edad": 5,
            "vacunado": true,
            "raza": "mestizo",
            "foto": "https://drive.google.com/file/d/1nVqpOOP6x9AotuB8SeGmQ8e22v36NNu7/view",
            "ciudad": "Corrientes",
            "usuarioId": "c23d1e5b-5a89-4794-aaf5-691f65f4826c"
        }
    },
    {
        "id": "fdedb4a8-1416-41ea-9a9d-4af94f8a4618",
        "titulo": "Publicacion de Pepe",
        "descripcion": "Soy guardian y amigo de otros perros. Tranquilo y fiel amigo",
        "telefono": "1122334567",
        "fecha_publicacion": "2025-11-05T20:36:31.358Z",
        "disponible": true,
        "mascotaId": "e50944d6-f19e-4768-955d-4805de327feb",
        "mascota": {
            "id": "e50944d6-f19e-4768-955d-4805de327feb",
            "nombre": "Pepe",
            "genero": "Macho",
            "edad": 3,
            "vacunado": true,
            "raza": "mestizo",
            "foto": "https://drive.google.com/file/d/1Ina5M_ESYoUYhLm-BbUDLx9g1pvru_mU/view",
            "ciudad": "San Cosme",
            "usuarioId": "69ac70d3-0eb9-43f0-a415-4aaff68e1018"
        }
    }
    ]
    ~~~
- GET http://localhost:3000/api/publicaciones/${id}
    - Recibe un id de publicacion y retorna un objeto con la informacion de dicha publicacion. Ej de respuesta:
    ~~~
     {
        "id": "42cd2f28-08c0-4666-9774-d91381adc572",
        "titulo": "Publciacion de Uli",
        "descripcion": "Soy muy cariñoso y agradecido, me sacaron de una situacion de maltrato. Soy super guardian e ideal para ser unico perro ! me llevo muy bien con la gente mayor y con los niños",
        "telefono": "11120202020",
        "fecha_publicacion": "2025-11-05T20:36:31.358Z",
        "disponible": true,
        "mascotaId": "c05f85ae-6918-4852-98a5-0e56bce3a3da",
        "mascota": {
            "id": "c05f85ae-6918-4852-98a5-0e56bce3a3da",
            "nombre": "Ulises",
            "genero": "Macho",
            "edad": 5,
            "vacunado": true,
            "raza": "mestizo",
            "foto": "https://drive.google.com/file/d/1nVqpOOP6x9AotuB8SeGmQ8e22v36NNu7/view",
            "ciudad": "Corrientes",
            "usuarioId": "c23d1e5b-5a89-4794-aaf5-691f65f4826c"
        }
    }
    ~~~
-  POST http://localhost:3000/api/publicaciones
    - Ruta para crear una nueva publicacion. 
    Los campos que se le deben pasar son los que se ven en el siguiente ejemplo:
    ~~~
    {
    "titulo": "Publicaciacion de ULISES",
    "descripcion": "Soy muy cariñoso y agradecido, me sacaron de una situacion de maltrato. Soy super guardian e ideal para ser unico perro ! me llevo muy bien con la gente mayor y con los niños",
    "telefono": "11120202020",
    "nombre": "Ulises", 
    "genero": "Macho", 
    "edad": 5, 
    "vacunado": true, 
    "raza": "mestizo", 
    "foto": "https://drive.google.com/file/d/1nVqpOOP6x9AotuB8SeGmQ8e22v36NNu7/view", 
    "ciudad": "Corrientes"
}
    ~~~
    La ruta retorna un objeto con la publicacion creada.
- PUT http://localhost:3000/api/publicaciones
    - Recibe un id de publicacion en el body, junto con los datos que se desea modificar. Ej:
    ~~~
    {
       "id": "cde9be81-2578-45dc-8763-d941919d3192",
        "titulo": "Publicacion de Pia",
        "descripcion": "Soy muy alegre, me llevo bien con la gente mayor y con los niños.Super amigable"
    }
    ~~~
    Retorna un objeto con la informacion de la publicacion, que tiene la publicacion modificada. Ej de respuesta:

     ~~~
        {
    "id": "cde9be81-2578-45dc-8763-d941919d3192",
    "titulo": "Publicacion de Pia",
    "descripcion": "Soy muy alegre, me llevo bien con la gente mayor y con los niños.Super amigable",
    "telefono": "123456789",
    "fecha_publicacion": "2025-11-05T20:27:42.470Z",
    "disponible": true,
    "mascotaId": "0197af57-a7ee-4a60-a8b9-870ba7b6ef20",
    "mascota": {
        "nombre": "Hembra",
        "genero": "4",
        "edad": 4,
        "vacunado": true,
        "raza": "mestizo",
        "foto": "https://drive.google.com/file/d/19HfV_h7dluX2_F41RsbPnJiz5z3O39Rr/view",
        "ciudad": "Paso de la Patria",
        "usuarioId": "a74ed940-2829-450e-b70f-dddc5c1267b7"
    }
}
    ~~~

- DELETE http://localhost:3000/api/publicaciones
    - Recibe por body el id de la publicacion que se desea eliminar. La publicacion se elimina de la BD. 
   
     ~~~
    {
      "id" : ""
    }
    ~~~
    Retorna un objeto con un mensaje informando que de dicha publicacion ha sido eliminada. Ej de salida:
     ~~~
    {
        "mensaje": "Publicacion eliminada"
    }
    ~~~
### Mascotas

- GET http://localhost:3000/api/publicaciones:
    - Retorna todas las publicaciones de la BD en un array de objetos.No requiere pasarle ningun parametro. Ej de respuesta:
    ~~~
    [
   
    ]
    ~~~
- GET http://localhost:3000/api/publicaciones/${id}
    - Recibe un id de publicacion y retorna un objeto con la informacion de dicha publicacion. Ej:
    ~~~
    {
    }
    ~~~
-  POST http://localhost:3000/api/publicaciones
    - Ruta para crear una nueva publicacion. 
    Crea la mascota asociada a la publicacion y la publicacion correspondiente a dicha mascota.
    Los campos que se le deben pasar son los que se ven en el siguiente ejemplo:
    ~~~
    {
        "titulo": "Publicaciacion de ULISES",
        "descripcion": "Soy muy cariñoso y agradecido, me sacaron de una situacion de maltrato. Soy super guardian e ideal para ser unico perro ! me llevo muy bien con la gente mayor y con los niños",
        "telefono": "11120202020",
        "nombre": "Ulises", 
        "genero": "Macho", 
        "edad": 5, 
        "vacunado": true, 
        "raza": "mestizo", 
        "foto": "https://drive.google.com/file/d/1nVqpOOP6x9AotuB8SeGmQ8e22v36NNu7/view", 
        "ciudad": "Corrientes"
    }
    ~~~
    La ruta retorna un objeto con la publicacion creada.
- PUT http://localhost:3000/api/publicaciones
    - Recibe un id de publicacion en la ruta de llama, en el body, junto con los datos que se desea modificar. Ej:
    ~~~
    {
        "id": "bef88b36-50a2-46cb-88d2-8a7bde63eb6e",
        "fecha_publicacion": "2025-11-09T16:37:43.772Z",
        "disponible": true,
        "titulo": "Publicaciacion de ULISES",
        "descripcion": "Soy muy cariñoso y agradecido, me sacaron de una situacion de maltrato. Soy super guardian e ideal para ser unico perro ! me llevo muy bien con la gente mayor y con los niños",
        "telefono": "11120202020",
        "mascotaId": "dae55d3e-58b3-4ad8-98f0-1bfa83aeec15"
   }
    ~~~
    Retorna un objeto con la informacion de la publicacion, que tiene la publicacion modificada. Ej de respuesta:

     ~~~
    {
       
    }
    ~~~

- DELETE http://localhost:3000/api/publicaciones
    - Recibe por body el id de la publicacion que se desea eliminar. La publicacion se elimina de la BD. 
   
     ~~~
    {
      "id" : ""
    }
    ~~~
    Retorna un objeto con la informacion de dicha publicacion eliminada. Ej de salida:
     ~~~
    {
       
    }
    ~~~