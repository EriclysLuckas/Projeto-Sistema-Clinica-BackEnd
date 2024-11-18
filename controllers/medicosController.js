const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Listar todos os médicos
exports.getMedicos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicos');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao listar médicos:', error);
        res.status(500).json({ error: 'Erro ao listar médicos' });
    }
};

// Obter um médico específico por ID
exports.getMedicoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM medicos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o médico:', error);
        res.status(500).json({ error: 'Erro ao buscar o médico' });
    }
};

// Criar um novo médico
exports.createMedico = async (req, res) => {
    const {
        usuario_id,
        nome,
        cpf,
        crm,
        especialidade,
        telefone,
        email,
        endereco_consultorio
    } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query(
            `INSERT INTO medicos (id, usuario_id, nome, cpf, crm, especialidade, telefone, email, endereco_consultorio) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [id, usuario_id, nome, cpf, crm, especialidade, telefone, email, endereco_consultorio]
        );
        res.status(201).json({ message: 'Médico criado com sucesso', id: result.rows[0].id });
    } catch (error) {
        console.error('Erro ao criar o médico:', error);
        res.status(500).json({ error: 'Erro ao criar o médico' });
    }
};

// Atualizar um médico pelo ID
exports.updateMedico = async (req, res) => {
    const { id } = req.params;
    const {
        usuario_id,
        nome,
        cpf,
        crm,
        especialidade,
        telefone,
        email,
        endereco_consultorio
    } = req.body;
    try {
        const result = await pool.query(
            `UPDATE medicos 
             SET usuario_id = $1,
                 nome = $2,
                 cpf = $3,
                 crm = $4,
                 especialidade = $5,
                 telefone = $6,
                 email = $7,
                 endereco_consultorio = $8
             WHERE id = $9 RETURNING *`,
            [usuario_id, nome, cpf, crm, especialidade, telefone, email, endereco_consultorio, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }
        res.status(200).json({ message: 'Médico atualizado com sucesso', medico: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar o médico:', error);
        res.status(500).json({ error: 'Erro ao atualizar o médico' });
    }
};

// Excluir um médico por ID
exports.deleteMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM medicos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Médico não encontrado' });
        }
        res.status(200).json({ message: 'Médico removido com sucesso', medico: result.rows[0] });
    } catch (error) {
        console.error('Erro ao remover o médico:', error);
        res.status(500).json({ error: 'Erro ao remover o médico' });
    }
};
