const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');

router.get('/base', baseController.listarTarefas);

module.exports = router;