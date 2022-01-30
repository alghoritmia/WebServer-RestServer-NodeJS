//role model for mongoDB

const { Schema, model } = require('mongoose');

const RoleSchema =  Schema({
    rol: {
        type: String,
        required: [true, 'The Role is required'],
    }
})

module.exports = model( 'Role', RoleSchema );