# WebServer & RestServer : NODE JS

Run ´´´ npm install ´´´ to rebuild Node modules

### -- Acerca de la App / About the App --

Esta demo app (Webserver & Restserver) creada usando NodeJS con express y MongoDB. 
Permite obtener datos de una colección de objetos de usuarios con roles y productos con categorías.

This demo app (Webserver & Restserver) created using NodeJS with express and MongoDB.
It allows obtaining data from a collection of user objects with roles and products with categories.

[Ver Documentación / View Documentation](https://documenter.getpostman.com/view/2880457/UVeFPSWm)

Production URL:
```
https://dashboard.heroku.com/apps/restserver-herokuv1
```

### Development Technologies:
```
"bcryptjs": "^2.4.3",
"cloudinary": "^1.28.1",
"cors": "^2.8.5",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-fileupload": "^1.3.1",
"express-validator": "^6.9.2",
"google-auth-library": "^6.1.6",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.11.15",
"uuid": "^8.3.2"
```


### Estructura de datos DB / DB data structure
-- Users & Roles Object collections --

USUARIOS:
```
* _id: objetcId,
* nombre: String,
* correo: String,
* password: String,
* img: String
* rol: String - enum: ['ADMIN_ROLE', 'USER_ROLE']
* estado: Boolean,
* google: Boolean
```
ROLES:
```
*  _id: objetcId,
* rol: String - enum: ['ADMIN_ROLE', 'USER_ROLE']
```

CATEGORIAS
```
* _id: objetcId,
* nombre: String,
* estado: Boolean,
* usuario: User Id
```

PRODUCTOS
```
* _id:objetcId,
* nombre: String,
* estado: Boolean,
* usuario: User Id
* precio: Number
* categoria: Category Id
* descripcion: String,
* disponible: Boolean
```



    