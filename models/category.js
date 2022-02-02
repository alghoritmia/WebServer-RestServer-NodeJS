//category model for mongoDB

const { Schema, model } = require('mongoose');

const CategorySchema =  Schema({
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
    }
})

// destructuring toJSON method for hidden password
CategorySchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Category', CategorySchema );