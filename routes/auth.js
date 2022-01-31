// desestructurando express para obtener router -- destructuring express to get router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Middlewears/Validate');
const { login } = require('../controllers/auth');

const router = Router(); 

router.post('/login',[
    check('correo', 'E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validarCampos
], login);

module.exports = router;