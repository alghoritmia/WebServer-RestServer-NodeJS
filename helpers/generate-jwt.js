const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, rejected) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                rejected('Error: Web Token not generated')
            }else{
                resolve( token );
            }
        })

    })
}

module.exports = {

    generateJWT

}