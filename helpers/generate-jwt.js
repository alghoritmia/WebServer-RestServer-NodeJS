const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, rejected) => {

        const payload = { uid };

        jwt.sign( payload, 'Est03sMyPub1cK3y23', {
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