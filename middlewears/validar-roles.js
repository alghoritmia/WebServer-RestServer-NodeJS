const { response } = require("express");

const esAdminRole = ( req, res = response, next ) => {

    // revisamos que se haya validado el JWT
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Validar web token primero antes de verificar rol '
        })
    }

    // desectructuramos rol y nombre del usuario registrado con JWT
    const { rol, nombre } = req.user;

    // validamos que sea rol administrador para ejecutar la operación
    if ( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ nombre } debe ser administrador`
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return ( req, res = response, next ) => {

        //console.log(roles);

        // validamos que el usuario tenga alguno de los roles listados en roles para ejecutar la operación
        if ( !roles.includes( req.user.rol )){
            return res.status(401).json({
                msg: `El usuario debe tener uno de estos roles: ${ roles }`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}