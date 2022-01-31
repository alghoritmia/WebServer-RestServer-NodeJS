const { response, request } = require('express');
const { use } = require('express/lib/application');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {

    const webtoken = req.header('x-token');

    if ( !webtoken ){
        return res.status(401).json({
            msg: 'Do not token at request'
        });
    }

    try {

            const { uid } = jwt.verify( webtoken, process.env.SECRETKEY );

            //console.log( payload );
            const user = await User.findById( uid ); //buscamos el usuario del uid

            // validate if existe user
            if ( !user ){
                return res.status(401).json({
                    msg: 'invalid webtoken - user does not exist'
                });
            }

            // validamos si el estado es false
            if ( !user.estado ){
                return res.status(401).json({
                    msg: 'invalid webtoken - user state: false'
                });
            }

            req.user = user;
            next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Invalid webtoken'
        })

    }

    

}

module.exports = {
    validateJWT
}