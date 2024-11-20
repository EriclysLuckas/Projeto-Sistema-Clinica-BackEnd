const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.get('/pacientes', pacientesController.getPacientes);
router.get('/pacientes/:id', pacientesController.getPacienteById);
router.post('/pacientes', pacientesController.createPaciente);
router.put('/pacientes/:id', pacientesController.updatePaciente);
router.delete('/pacientes/:id', pacientesController.deletePaciente);

module.exports = router;