const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

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

module.exports = {
    login
}