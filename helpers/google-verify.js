const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( '315797240936-66qa9l4p2g8mvbe80adu2nep4lal31f7.apps.googleusercontent.com' );

async function googleVerify( token = '' ) {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience:  '315797240936-66qa9l4p2g8mvbe80adu2nep4lal31f7.apps.googleusercontent.com' ,  
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });


  //const { name, picture, email } = ticket.getPayload();
  const { name, picture, email } = ticket.getPayload();

  //console.log( payload );
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return {
      nombre: name,
      img: picture,
      correo: email
  }

}

module.exports = {
    googleVerify
}
