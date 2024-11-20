const express = require('express');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/usersRoutes');
const client = require('./config/database');
const agendamentosRouter = require('./routes/agendamentoRouter');
const pacientesRoutes = require('./routes/pacientesRoutes');
const server = require('http');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o aplicativo Express
const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Rotas
app.use('/api', usersRoutes);
app.use('/api', agendamentosRouter);
app.use('/api', pacientesRoutes);

// Testar conexão com o banco de dados PostgreSQL
client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados:', res.rows[0]);
  }
});

// Definir a porta do servidor a partir do .env ou usar 3000 por padrão
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
