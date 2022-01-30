//validation functions
const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if  (!existeRol ){
        throw new Error(`Role: ${ rol } is not registered`);
    }
}

const existeEmail = async(correo = '') => {

    const existeEmail = await User.findOne({ correo });
    if ( existeEmail ){
        throw new Error(`E-mail: ${ correo } is already registered`);
    }

}

const existeUserPorId = async( id ) => {

    const existeUser = await User.findById( id );
    if ( !existeUser ){
        throw new Error(`Id: ${ id } does not exist`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUserPorId
}