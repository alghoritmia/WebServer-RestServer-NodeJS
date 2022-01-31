# WebServer & RestServer : NODE JS

Run ´´´ npm install ´´´ to rebuild Node modules

# -- Acerca de la App / About the App --

Esta demo app (Webserver & Restserver) creada usando NodeJS con express y MongoDB. Permite consumir endpoints de una colección de objetos de usuarios con roles a través de rutas tales como:

This demo app (Webserver & Restserver) created using NodeJS with express and MongoDB, allows to consume endpoints from a collection of user objects with roles through routes such as:

* {URL}:{PORT}/api/users for POST, GET ... ({URL} = localhost, {PORT} = 8080 for Dev Mode)

* {URL}:{PORT}/api/users?limite={limit}}&desde={from} for GET ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {limit} = number of objects to request, {from} = from which object you want to request)

* {URL}:{PORT}/api/users/{id} for PUT, DELETE ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode, {id} = user id)

* {URL}:{PORT}/api/auth/login for Login with JWT (Json Web Token) ... ({URL} = localhost:8080, {PORT} = 8080 for Dev Mode)


# Estructura de datos DB / DB data structure
-- Users & Roles Object collections --

USERS:
* _id: objetcId,
* nombre: String,
* correo: String,
* password: String,
* img: String
* rol: String - enum: ['ADMIN_ROLE', 'USER_ROLE']
* estado: Boolean,
* google: Boolean

ROLES:
*  _id: objetcId,
* rol: String - enum: ['ADMIN_ROLE', 'USER_ROLE']

# Packages used:

* bcrypt js
* corsets
* dowry
* express
* express-validator
* mongoose
* jsonwebtoken
* google-auth-library