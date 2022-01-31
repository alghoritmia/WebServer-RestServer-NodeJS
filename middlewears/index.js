const validateJWT = require('../middlewears/validar-jwt');
const validarCampos = require('../Middlewears/Validate');
const tieneRole = require('../Middlewears/validar-roles');

module.exports = {

    ...validateJWT,
    ...validarCampos,
    ...tieneRole

}