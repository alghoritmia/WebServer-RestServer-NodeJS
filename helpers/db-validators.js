const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if  (!existeRol ){
        throw new Error(`El rol ${ rol } no está registrado`);
    }
}

const existeEmail = async(correo = '') => {

    const existeEmail = await User.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`Ese Correo ${ correo } ya está registrado`);
    }

}

const existeUserPorId = async( id ) => {

    const existeUser = await User.findById( id );
    if ( !existeUser ){
        throw new Error(`El id: ${ id } no existe`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUserPorId
}