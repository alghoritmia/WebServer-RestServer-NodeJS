# WebServer & RestServer : NODE JS

Run ´´´ npm install ´´´ to rebuild Node modules

### -- Acerca de la App / About the App --

Esta demo app (Webserver & Restserver) creada usando NodeJS con express y MongoDB. Permite consumir endpoints de una colección de objetos de usuarios con roles a través de rutas tales como:

This demo app (Webserver & Restserver) created using NodeJS with express and MongoDB, allows to consume endpoints from a collection of user objects with roles through routes such as:

```
* {URL}:{PORT}/api/usuarios for POST, GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/usuarios?limite={limit}}&desde={from} for GET ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {limit} = number of objects to request, {from} = from which object you want to request)

* {URL}:{PORT}/api/usuarios/{id} for PUT, DELETE ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {id} = user id)

* {URL}:{PORT}/api/categorias for POST, GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/categorias/{id} for GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/categorias?limite={limit}}&desde={from} for GET ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {limit} = number of objects to request, {from} = from which object you want to request)

* {URL}:{PORT}/api/categorias/{id} for PUT, DELETE ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {id} = user id)

* {URL}:{PORT}/api/productos for POST, GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/productos/{id} for GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/productos?limite={limit}}&desde={from} for GET ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {limit} = number of objects to request, {from} = from which object you want to request)

* {URL}:{PORT}/api/productos/{id} for PUT, DELETE ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {id} = user id)

* {URL}:{PORT}/api/{collection}/{term} for GET ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {collection} = [categories, products, roles, users], {term} = term to search )

* {URL}:{PORT}/api/auth/login for Login with JWT (Json Web Token) ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode)
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

### Packages used:
```
"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-validator": "^6.9.2",
"google-auth-library": "^6.1.6",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.11.15"
```

    