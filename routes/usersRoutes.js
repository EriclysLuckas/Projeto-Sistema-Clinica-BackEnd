const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/usuarios', usersController.listarUsuarios);
router.post('/usuarios', usersController.criarUsuario);
router.get('/usuarios/:id', usersController.obterUsuario);
router.put('/usuarios/:id', usersController.atualizarUsuario);
router.delete('/usuarios/:id', usersController.deletarUsuario);

module.exports = router;