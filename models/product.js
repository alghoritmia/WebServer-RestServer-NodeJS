//products model for mongoDB

const { Schema, model } = require('mongoose');

const ProductsSchema =  Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true }
})

// destructuring toJSON method for hidden password
ProductsSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductsSchema );