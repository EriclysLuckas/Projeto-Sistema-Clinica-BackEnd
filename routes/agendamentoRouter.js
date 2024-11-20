const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/agendamentos', agendamentosController.getAgendamentos);
router.get('/agendamentos/:id', agendamentosController.getAgendamentoById);
router.post('/agendamentos', agendamentosController.createAgendamento);
router.put('/agendamentos/:id', agendamentosController.updateAgendamento);
router.delete('/agendamentos/:id', agendamentosController.deleteAgendamento);

module.exports = router;
