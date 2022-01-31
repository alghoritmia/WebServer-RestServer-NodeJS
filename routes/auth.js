// desestructurando express para obtener router -- destructuring express to get router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Middlewears/Validate');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router(); 

router.post('/login',[
    check('correo', 'E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'Id_Token is required').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;