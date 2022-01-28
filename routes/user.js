// desestructurando express para obtener router -- destructuring express to get router
const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, existeEmail, existeUserPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../Middlewears/Validate');

// desestructurando users para obtener Paths -- destructuring users to get paths
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');

const router = Router(); 

// GET REQUEST ENDPOINT
router.get('/', usersGet );

// POST REQUEST ENDPOINT
router.post('/', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    //check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('correo').custom( existeEmail ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usersPost );

 // PUT REQUEST ENDPOINT
router.put('/:id',[
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUserPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usersPut );

 // DELETE REQUEST ENDPOINT
router.delete('/:id',[
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUserPorId ),
    validarCampos
], usersDelete );

 // PATCH REQUEST ENDPOINT
 router.patch('/', usersPatch );

// Exportación de módulo router -- router module export
module.exports = router;