const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController');

router.get('/medicos', medicosController.getMedicos);
router.get('/medicos/:id', medicosController.getMedicoById);
router.post('/medicos', medicosController.createMedico);
router.put('/medicos/:id', medicosController.updateMedico);
router.delete('/medicos/:id', medicosController.deleteMedico);

module.exports = router;
