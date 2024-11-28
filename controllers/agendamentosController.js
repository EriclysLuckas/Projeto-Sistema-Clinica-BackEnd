const pool = require('../config/database');

const { v4: uuidv4 } = require('uuid');

// Listar todos os agendamentos
exports.getAgendamentos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM agendamentos');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ error: 'Erro ao listar agendamento' });
    }
};

// Obter um agendamento específico por ID
exports.getAgendamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM agendamentos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o agendamento:', error);
        res.status(500).json({ error: 'Erro ao buscar o agendamento' });
    }
};

// Criar um novo agendamento
exports.createAgendamento = async (req, res) => {
    const { paciente_id, medico_id, data_hora, notificacao_paciente, notificacao_medico } = req.body;
    const id = uuidv4();
    
    try {
        // 1. Verificar se já existe um agendamento para esse médico na mesma data e hora
        const resultConflito = await pool.query(
            'SELECT * FROM agendamentos WHERE medico_id = $1 AND data_hora = $2',
            [medico_id, data_hora]
        );
        
        // Se houver um agendamento conflitante, retornar erro
        if (resultConflito.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Já existe um agendamento para este médico neste horário.',
            });
        }

        // 2. Caso contrário, criar o novo agendamento
        const result = await pool.query(
            'INSERT INTO agendamentos (id, paciente_id, medico_id, data_hora, notificacao_paciente, notificacao_medico) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [id, paciente_id, medico_id, data_hora, notificacao_paciente, notificacao_medico]
        );
        
        res.status(201).json({ message: 'Agendamento criado com sucesso', id: result.rows[0].id });
    } catch (error) {
        console.error('Erro ao criar o agendamento:', error);
        res.status(500).json({ error: 'Erro ao criar o agendamento' });
    }
};
// Atualizar um agendamento pelo ID
exports.updateAgendamento = async (req, res) => {
    const { id } = req.params;
    const { paciente_id, medico_id, data_hora, notificacao_paciente, notificacao_medico } = req.body;
    
    try {
        const result = await pool.query(
            `UPDATE agendamentos 
             SET paciente_id = $1, 
                 medico_id = $2, 
                 data_hora = $3, 
                 notificacao_paciente = $4, 
                 notificacao_medico = $5 
             WHERE id = $6 RETURNING *`,
            [paciente_id, medico_id, data_hora, notificacao_paciente, notificacao_medico, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento atualizado com sucesso', agendamento: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar o agendamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
    }
};

// Excluir um agendamento por ID
exports.deleteAgendamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM agendamentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento removido com sucesso', agendamento: result.rows[0] });
    } catch (error) {
        console.error('Erro ao remover o agendamento:', error);
        res.status(500).json({ error: 'Erro ao remover o agendamento' });
    }
};


