const client = require('../config/database.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { CPF } = require('cpf-cnpj-validator');
const validator = require('validator');

const listarUsuarios = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM usuarios');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send('Erro ao listar usuários -- ' + err);
    }
};

const criarUsuario = async (req, res) => {
    const { nome, email, senha, cpf, perfil } = req.body;

    if (!nome || !email || !senha || !cpf || !perfil) {
        return res.status(400).send('Forneça os campos obrigatórios para criação do usuário.');
    }

    // if (!['admin', 'medico', 'paciente'].includes(perfil)) {
    //     return res.status(400).send('Perfil inválido.');
    // }    

    // if (!CPF.isValid(cpf)) {
    //     return res.status(400).send('CPF inválido.');
    // }

    if (email && !validator.isEmail(email)) {
        return res.status(400).send('Email inválido.');
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const id = uuidv4();

    const dataCriacao = new Date();
    const dataAtualizacao = new Date();

    try {
        const result = await client.query(
            'INSERT INTO usuarios (id, nome, email, senha, cpf, perfil, data_criacao, data_atualizacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [id, nome, email, senhaCriptografada, cpf, perfil, dataCriacao, dataAtualizacao]
        );

        const usuarioCriado = result.rows[0];
        delete usuarioCriado.senha;

        return res.status(201).json(usuarioCriado);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        return res.status(500).send('Erro ao criar usuário.');
    }
};

const obterUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao obter usuário:', err);
        res.status(500).send('Erro ao obter usuário');
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, cpf, perfil } = req.body;

    if (!nome && !email && !senha && !cpf && !perfil) {
        return res.status(400).send('Forneça ao menos um campo para atualização.');
    }

    if (cpf && !CPF.isValid(cpf)) {
        return res.status(400).send('CPF inválido.');
    }

    if (email && !validator.isEmail(email)) {
        return res.status(400).send('Email inválido.');
    }

    const dataAtualizacao = new Date();
    let senhaCriptografada;

    if (senha) {
        const saltRounds = 10;
        senhaCriptografada = await bcrypt.hash(senha, saltRounds);
    }

    const campos = [];
    const valores = [];

    if (nome) { campos.push('nome = $' + (campos.length + 1)); valores.push(nome); }
    if (email) { campos.push('email = $' + (campos.length + 1)); valores.push(email); }
    if (senhaCriptografada) { campos.push('senha = $' + (campos.length + 1)); valores.push(senhaCriptografada); }
    if (cpf) { campos.push('cpf = $' + (campos.length + 1)); valores.push(cpf); }
    if (perfil) { campos.push('perfil = $' + (campos.length + 1)); valores.push(perfil); }

    campos.push('data_atualizacao = $' + (campos.length + 1));
    valores.push(dataAtualizacao);

    try {
        const query = `
            UPDATE usuarios
            SET ${campos.join(', ')}
            WHERE id = $${valores.length + 1} 
            RETURNING *;
        `;
        valores.push(id);

        const result = await client.query(query, valores);

        if (result.rows.length > 0) {
            const usuarioAtualizado = result.rows[0];
            delete usuarioAtualizado.senha;  // Remove a senha do retorno
            res.json(usuarioAtualizado);
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).send('Erro ao atualizar usuário.');
    }
};

const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query('DELETE FROM usuarios WHERE id = $1', [id]);
        if (result.rowCount > 0) {
            res.status(204).send('Usuário deletado com sucesso.');
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).send('Erro ao deletar usuário');
    }
};

module.exports = { listarUsuarios, criarUsuario, obterUsuario, atualizarUsuario, deletarUsuario };