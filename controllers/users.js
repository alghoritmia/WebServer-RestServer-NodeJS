// desestructurando express para obtener solicitudes y respuestas -- destructuring express to get request & response
const { response, request } = require('express');

// Lista de metodos para manejar usuarios -- List of functions to manage users

const usersGet = (req = request, res = response) => {

    const {q, nombre=' ', apikey} = req.query;
    
    res.json({
        mensaje: 'get API desde el controlador',
        q,
        nombre,
        apikey
    });

  };

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        mensaje: 'put API desde el controlador',
        id
    });

};

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        mensaje: 'post API desde el controlador',
        nombre,
        edad
    });

};

const usersDelete = (req, res = response) => {

res.json({
    mensaje: 'delete API desde el controlador'
});

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