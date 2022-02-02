//validation functions
const {
    Category,
    Role,
    Server,
    User,
    Product
} = require('../models');

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

const existeCategoryPorId = async( id ) => {

    const existeCategory = await Category.findById( id );
    if ( !existeCategory ){
        throw new Error(`Category Id: ${ id } does not exist`);
    }
}

const existeProductPorId = async( id ) => {

    const existeProduct = await Product.findById( id );
    if ( !existeProduct ){
        throw new Error(`Produc Id: ${ id } does not exist`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUserPorId,
    existeCategoryPorId,
    existeProductPorId
}