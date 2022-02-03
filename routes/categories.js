const { Router } = require('express');
const { check } = require('express-validator');


const {
    validarCampos,
    validateJWT,
    tieneRole,
    esAdminRole
} = require('../middlewears');

const { existeCategoryPorId } = require('../helpers/db-validators');

const { createCategory, getCategories, getCategory, putCategory, deleteCategory } = require('../controllers/categories');

const router = Router(); 

// Obtener todas las categorias
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existeCategoryPorId ),
    //check('rol').custom( esRoleValido ),
    validarCampos
] ,getCategory);

// Crear una categoria - privado... cualquiera con token valido
router.post('/', [ 
    validateJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    validarCampos
], createCategory);

// Actualizar una categoria - privado... cualquiera con token valido
router.put('/:id',[
    validateJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    check('id').custom( existeCategoryPorId ),
    validarCampos
] ,putCategory)

// Borrar una categoria - Admin... marcar estado en false
router.delete('/:id',[    
    validateJWT,
    esAdminRole,
    //tieneRole('USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( existeCategoryPorId ),
    validarCampos
], deleteCategory)

// Exportación de módulo router -- router module export
module.exports = router;