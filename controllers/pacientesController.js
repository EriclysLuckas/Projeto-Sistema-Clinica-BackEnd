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
        return res.status(400).json({message: 'Error: Nenhum dado fornecido na requisição.'});
    }

    // Adiciona dados se não estiver vazia
    dados.push(dadosNovos);
    res.status(201).json({message: 'Dados adicionados com sucesso!,', dadosNovos})
};
 

// Requisição PUT para atualizar um dado existente pelo ID
exports.updateDados = (req, res) => {
   const id = req.params.id;
   const dadosAtualizados = req.body;

   // Encontrar o índice do dado com o ID especificado
   const index = dados.findIndex(item => item.id === id);

   if (index === -1) {
       return res.status(404).json({ message: 'Error: Dado não encontrado.' });
   }

   // Atualizar o dado no índice encontrado
   dados[index] = { ...dados[index], ...dadosAtualizados };
   res.status(200).json({ message: 'Dados atualizados com sucesso!', dados: dados[index] });
};

// Requisição DELETE para remover um dado existente pelo ID
exports.deleteDados = (req, res) => {
   const id = req.params.id;

   // Encontrar o índice do dado com o ID especificado
   const index = dados.findIndex(item => item.id === id);

   if (index === -1) {
       return res.status(404).json({ message: 'Error: Dado não encontrado.' });
   }

   // Remover o dado do array
   const dadoRemovido = dados.splice(index, 1);
   res.status(200).json({ message: 'Dados removidos com sucesso!', dados: dadoRemovido[0] });
};