const express = require('express');
const router = express.Router();
const pacienteDados = require('../controllers/pacientesController');

// Rota GET
router.get('/getpaciente', pacienteDados.getDados);

// Rota POST
router.post('/postpaciente', pacienteDados.addDados);

module.exports = router;