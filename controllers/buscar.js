const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { 
    Category,
    Role,
    Server,
    User,
    Product
} = require('../models'); //import user model from database

const coleccionesPermitidas = [
    'users',
    'categories',
    'products',
    'roles'
];

const buscarUsers =  async ( termino ='' , res = response) => {

    const esMongoID = ObjectId.isValid( termino );
    
    if ( esMongoID ) {

        const user = await User.findById(termino);

        return res.json({
            results: ( user ) ? [ user ] : []
        });

    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await User.find({ 
        $or:    [{ nombre: regex }, { correo: regex }],
        $and:   [{ estado: true }]
    });

    res.json({
        results: usuarios
    })
    
}

const buscarCategories =  async ( termino ='' , res = response) => {

    const esMongoID = ObjectId.isValid( termino );
    
    if ( esMongoID ) {

        const categoria = await Category.findById(termino);

        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });

    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Category.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    })
    
}

const buscarProducts =  async ( termino ='' , res = response) => {

    const esMongoID = ObjectId.isValid( termino );
    
    if ( esMongoID ) {

        const producto = await Product.findById(termino)
                                    .populate('categoria','nombre');

        return res.json({
            results: ( producto ) ? [ producto ] : []
        });

    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Product.find({ 
        $or:    [{ nombre: regex }, { descripcion: regex }],
        $and:   [{ estado: true }]
    }).populate('categoria','nombre');

    res.json({
        results: productos
    })
    
}

const buscarRoles =  async ( termino ='' , res = response) => {

    const esMongoID = ObjectId.isValid( termino );
    
    if ( esMongoID ) {

        const rol = await Role.findById(termino);

        return res.json({
            results: ( rol ) ? [ rol ] : []
        });

    }

    const regex = new RegExp( termino, 'i' );

    const roles = await Role.find({ rol: regex });

    res.json({
        results: roles
    })
    
}

const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'users':
            buscarUsers(termino, res)
        break;
        case 'categories':
            buscarCategories(termino, res)
        break;
        case 'products':
            buscarProducts(termino, res)
        break;
        case 'roles':
            buscarRoles(termino, res)
        break;
       default:
            res.status(500).json({
                msg: `Se olvido hacer esta búsqueda`
            })
    }

  };

module.exports = {
    buscar
}