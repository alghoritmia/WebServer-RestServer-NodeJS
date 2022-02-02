// desestructurando express para obtener solicitudes y respuestas -- destructuring express to get request & response
const { response, request } = require('express');

const Product = require('../models/product');

// insert product data
const createProduct = async (req, res = response) => {

    //const nombre = req.body.nombre.toUpperCase();

    const { estado, usuario, ...body } = req.body;

    //buscamos en DB si hay producto con el nombre
    const productDB = await Product.findOne({ nombre: body.nombre.toUpperCase() });

    // vemos si ya existe
    if ( productDB ){
        return res.status(400).json({
            msg: `El producto: ${ productDB.nombre }, ya existe`,
        })
    }

    // datos a grabar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.user._id
    }
    
    // instancia del modelo categoria    
    const producto = new Product( data );

    //grabar en DB
    await producto.save();

    res.status(201).json( producto );


};


// obtener productos
const getProducts = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
        .populate( 'usuario', 'nombre' )
        .populate( 'categoria', 'nombre' )
        .skip( Number(desde) )
        .limit( Number(limite) )
    ]);
    
    res.json({        
        total,
        products
    });

  };


// obtener producto
const getProduct = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findById( id )
                            .populate( 'usuario', 'nombre' )
                            .populate( 'categoria', 'nombre' );
    
    res.json(product);

  };


  // update producto
const putProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if ( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.user._id;
    
    const product = await Product.findByIdAndUpdate( id, data, { new: true } );
    
    res.json(product);

  };

   // delete product
const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const productDeleted = await Product.findByIdAndUpdate( id, { estado: false }, { new: true } );
    
    res.json(productDeleted);

  };

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct
}