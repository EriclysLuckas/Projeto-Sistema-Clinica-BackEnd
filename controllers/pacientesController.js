let dados = [];

// solicitação GET
exports.getDados = (req, res) => {
    res.json(dados);
};

// requisição POST
exports.addDados = (req, res) => {
    const dadosNovos = req.body;

    // Verificar se existe dados na tabela
    if (!dadosNovos || Object.keys(dados).length === 0) {
        return res.status(400).json({menssage: 'Error: Nenhum dado fornecido na requisição.'});
    }

    // Adiciona dados se não estiver vazia
    dados.push(dadosNovos);
    res.status(201).json({message: 'Dados adicionados com sucesso!,', dadosNovos})
};