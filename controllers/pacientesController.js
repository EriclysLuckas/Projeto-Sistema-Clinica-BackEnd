const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Listar todos os pacientes
exports.getPacientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pacientes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao listar pacientes:', error);
        res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
};

// Obter um paciente específico por ID
exports.getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o paciente:', error);
        res.status(500).json({ error: 'Erro ao buscar o paciente' });
    }
};

// Criar um novo paciente
exports.createPaciente = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, endereco, usuario_id } = req.body;
    const id = uuidv4(); // Gerando o UUID para o paciente
    try {
        // Verifique se usuario_id foi passado, caso contrário, retorne erro
        if (!usuario_id) {
            return res.status(400).json({ error: 'usuario_id é obrigatório' });
        }

        const result = await pool.query(
            `INSERT INTO pacientes (id, nome, cpf, data_nascimento, telefone, email, endereco, usuario_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
            [id, nome, cpf, data_nascimento, telefone, email, endereco, usuario_id]
        );
        res.status(201).json({ message: 'Paciente criado com sucesso', id: result.rows[0].id });
    } catch (error) {
        console.error('Erro ao criar o paciente:', error);
        res.status(500).json({ error: 'Erro ao criar o paciente' });
    }
};

// Atualizar um paciente pelo ID
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        endereco
    } = req.body;
    try {
        const result = await pool.query(
            `UPDATE pacientes 
             SET nome = $1,
                 cpf = $2,
                 data_nascimento = $3,
                 telefone = $4,
                 email = $5,
                 endereco = $6
             WHERE id = $7 RETURNING *`,
            [nome, cpf, data_nascimento, telefone, email, endereco, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }
        res.status(200).json({ message: 'Paciente atualizado com sucesso', paciente: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar o paciente:', error);
        res.status(500).json({ error: 'Erro ao atualizar o paciente' });
    }
};

// Excluir um paciente por ID
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM pacientes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }
        res.status(200).json({ message: 'Paciente removido com sucesso', paciente: result.rows[0] });
    } catch (error) {
        console.error('Erro ao remover o paciente:', error);
        res.status(500).json({ error: 'Erro ao remover o paciente' });
    }
};
