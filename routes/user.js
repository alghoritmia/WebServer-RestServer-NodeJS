// desestructurando express para obtener router -- destructuring express to get router
const { Router } = require('express');

// desestructurando users para obtener Paths -- destructuring users to get paths
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');

const router = Router(); 

// GET REQUEST ENDPOINT
router.get('/', usersGet );

// POST REQUEST ENDPOINT
router.post('/', usersPost );

 // PUT REQUEST ENDPOINT
router.put('/:id', usersPut );

 // DELETE REQUEST ENDPOINT
router.delete('/', usersDelete );

 // PATCH REQUEST ENDPOINT
 router.patch('/', usersPatch );

// Exportación de módulo router -- router module export
module.exports = router;