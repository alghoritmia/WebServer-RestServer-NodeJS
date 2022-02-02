const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    tieneRole,
    esAdminRole
} = require('../middlewears');

const { existeCategoryPorId, existeProductPorId } = require('../helpers/db-validators');

const { 
    createProduct,
    getProducts,
    getProduct,
    putProduct,
    deleteProduct 
} = require('../controllers/products');

const router = Router(); 

// Obtener todos los productos
router.get('/', getProducts);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'It is not a valid mongoDB ID').isMongoId(),
    check('id').custom( existeProductPorId ),
    //check('rol').custom( esRoleValido ),
    validarCampos
] ,getProduct);


// Crear un producto - privado... cualquiera con token valido
router.post('/', [ 
    validateJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    check('categoria', 'It is not a valid mongoDB ID').isMongoId(),
    check('categoria').custom( existeCategoryPorId ),
    validarCampos
], createProduct);


// Actualizar una categoria - privado... cualquiera con token valido
router.put('/:id',[
    validateJWT,
    check('nombre', 'Name is required').not().isEmpty(),
    check('id', 'It is not a valid MongoDB ID').isMongoId(),
    check('id').custom( existeProductPorId ),
    validarCampos
] ,putProduct)

// Borrar una categoria - Admin... marcar estado en false
router.delete('/:id',[    
    validateJWT,
    esAdminRole,
    //tieneRole('USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'It is not a valid mongoDB ID').isMongoId(),
    check('id').custom( existeProductPorId ),
    validarCampos
], deleteProduct)

// Exportación de módulo router -- router module export
module.exports = router;