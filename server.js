const express = require('express');
const dotenv = require('dotenv');
const baseRoutes = require('./routes/baseRoutes');
const client = require('./config/database');
const server = require('http');
// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o aplicativo Express
const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Rotas
app.use('/api', baseRoutes);


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

// Debug
app.get('/', (req, res) => {
  res.send('Welcome');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
