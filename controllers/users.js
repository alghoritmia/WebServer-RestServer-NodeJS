// desestructurando express para obtener solicitudes y respuestas -- destructuring express to get request & response
const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); //import library to encrypt keys 

const User = require('../models/user'); //import user model from database

// Lista de metodos para manejar usuarios -- List of functions to manage users

//get user data
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

// 
//update user data
const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    if ( password ) {
        //crypt pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    // VALIDATE ALL WITH DB
    const user = await User.findByIdAndUpdate( id, resto );

    res.json( user );

};

// insert user data
const usersPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new User({ nombre, correo, password, rol });

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // save in DB
    await usuario.save();

    res.json( usuario );

};

//delete user data
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