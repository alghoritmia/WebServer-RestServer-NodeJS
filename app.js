require('dotenv').config();
const Servidor = require('./models/server'); // Se importa para utilizar la clase server -- import server class

// Se crea una instancia del Servidor - An instance of the server is created
const servidor = new Servidor();

servidor.escuchar(); //listen server

