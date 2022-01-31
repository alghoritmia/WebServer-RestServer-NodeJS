const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // email validation
        const user = await User.findOne({ correo });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - Email'
            })
        }

        // user active
        if ( !user.estado ){
            return res.status(400).json({
                msg: 'User / Password are not correct - State: false'
            })
        }

        // password validation
        const validPass = bcryptjs.compareSync( password, user.password );
        if ( !validPass ){
            return res.status(400).json({
                msg: 'User / Password are not correct - Password'
            })
        }

        // create JWT
        const webtoken = await generateJWT( user.id );

        res.json({
            user,
            webtoken
        })

    } catch (error) {

            console.log(error);
            return res.status(500).json({
                msg: 'Talk with administrator'
            })
    }

    
    
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await User.findOne({ correo });

        //si usuario no existe
        if ( !usuario ){
            //crearlo
            const data = {
                nombre,
                correo,
                rol: "ADMIN_ROLE",
                password: ":P",
                img,
                google: true
            }

            usuario = new User( data );
            await usuario.save();

            console.log( usuario );
        }

        //si el usuario ya existe
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'User Blocked!'
            })
        }

        //generar JWT
        const token = await generateJWT( usuario.id );

        res.json({
            usuario,
            token
            
        })

    } catch (error){
        res.status(400).json({
            msg: 'Token Google no válido'
        })
    }
    

}

module.exports = {
    login,
    googleSignIn
}