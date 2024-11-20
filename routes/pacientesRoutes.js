const express = require('express');
const router = express.Router();
const pacienteDados = require('../controllers/pacientesController');

// Rota GET
router.get('/getpaciente', pacienteDados.getDados);

// Rota POST
router.post('/postpaciente', pacienteDados.addDados);

// Rota PUT
router.put('/putpaciente:id', pacienteDados.updateDados);

// Rota DELETE
router.delete('/deletepaciente:id', pacienteDados.deleteDados);


module.exports = router;

