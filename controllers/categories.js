// desestructurando express para obtener solicitudes y respuestas -- destructuring express to get request & response
const { response, request } = require('express');

const Category = require('../models/category');

// insert category data
const createCategory = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    //buscamos en DB si hay categoria con el nombre
    const categoryDB = await Category.findOne({ nombre });

    // vemos si ya existe
    if ( categoryDB ){
        return res.status(400).json({
            msg: `La categoría: ${ categoryDB.nombre }, ya existe`,
        })
    }

    // datos a grabar
    const data = {
        nombre,
        usuario: req.user._id
    }
    
    // instancia del modelo categoria    
    const categoria = new Category( data );

    //grabar en DB
    await categoria.save();

    res.status(201).json( categoria );


};

// obtener categorias
const getCategories = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
        .populate( 'usuario', 'nombre' )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);
    
    res.json({        
        total,
        categories
    });

  };

// obtener categoria
const getCategory = async (req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findById( id ).populate( 'usuario', 'nombre' );
    
    res.json(category);

  };

  // update categoria
const putCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.user._id;
    
    const category = await Category.findByIdAndUpdate( id, data, { new: true } );
    
    res.json(category);

  };

   // delete categoria
const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndUpdate( id, { estado: false }, { new: true } );
    
    res.json(categoryDeleted);

  };

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    putCategory,
    deleteCategory
}