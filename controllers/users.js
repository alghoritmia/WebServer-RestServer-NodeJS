// desestructurando express para obtener solicitudes y respuestas -- destructuring express to get request & response
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');

// Lista de metodos para manejar usuarios -- List of functions to manage users

const usersGet = async (req = request, res = response) => {

    //const {q, nombre='No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);
    
    res.json({        
        total,
        users
    });

  };

// UPDATE DATA
const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // VALIDATE ALL WITH DB
    if ( password ) {
        //crypt pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json( user );

};

// INSERT DATA
const usersPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new User({ nombre, correo, password, rol });

    //crypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // save in DB
    await usuario.save();

    res.json( usuario );

};

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    //Phisical delete row
    //const user = await User.findByIdAndDelete( id );

    //Logic delete row
    const user = await User.findByIdAndUpdate( id, { estado: false } );

    res.json( user );

};

const usersPatch = (req, res = response) => {

    res.json({
        mensaje: 'patch API desde el controlador'
    });
    
    };

 // Exportación de módulos para solicitudes y respuestas de usuarios -- Export of modules for user requests and responses
  module.exports = {
      usersGet,
      usersPost,
      usersPut,
      usersDelete,
      usersPatch
  }