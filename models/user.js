//user model for mongoDB

const { Schema, model } = require('mongoose');

const UserSchema =  Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required'],
    },
    correo: {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// destructuring toJSON method for hidden password
UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );