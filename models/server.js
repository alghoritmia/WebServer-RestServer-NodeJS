const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../db/config');

// Se crea la clase Server -- The server class is created
class Server {

    constructor() {

        this.app = express();

        // puerto establecido para escuchar al servidor -- Port to listen
        this.port = process.env.PORT;

        this.paths = {            
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categories: '/api/categories',
            products:   '/api/products',
            users:      '/api/users'
        }

        // Conectar a DB - DB Connect
        this.conectarDB();

        // Middlewears - Programas intermedios
        this.controlaracceso();
        
        // Rutas de la app -- App routes
        this.rutas();

    }

    async conectarDB() {
        await dbConnection();
    }

    //Métodos de control - Middlewears Method
    controlaracceso() {

        // limitar o permitir acceso a App -- limit or allow access to the app
        this.app.use( cors() );

        // Parseo del Body -- Body Parse
        this.app.use( express.json() );

        // configurar directorio público -- public access control
        this.app.use( express.static('public') );

    }

    // Se crean las rutas -- Routes are created
    rutas() {

        this.app.use(this.paths.auth, require('../routes/auth'));  
        this.app.use(this.paths.buscar, require('../routes/buscar'));       
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.users, require('../routes/user'));

        //ADD MORE ROUTES - SE PUEDE AGREGAR MÁS RUTAS
    
        }
    
    // función de escucha a través de puerto -- port listening function
    escuchar() {

        this.app.listen( this.port, () => {
            console.log('Server running on port: ', this.port);
        } );

    }

}

// Exportación de módulos -- module export
module.exports = Server;