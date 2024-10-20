Projeto Node.js com MySQL
Descrição
Este projeto é uma API construída em Node.js utilizando Express para gerenciamento de usuários, com integração a um banco de dados MySQL. O objetivo é criar uma API que permita operações CRUD (Create, Read, Update, Delete) em um banco de dados de usuários, incluindo autenticação e controle de acesso.

Estrutura do Projeto
A estrutura do projeto foi organizada para garantir uma separação clara das responsabilidades, facilitando a escalabilidade e a manutenção do código.

Estrutura de Diretórios
a
nome-do-projeto/
│
├── config/
│   └── database.js        # Configuração da conexão com o banco de dados (MySQL)
│
├── controllers/           # Controladores que tratam as regras de negócio
│   └── userController.js
│
├── routes/                # Definição das rotas da aplicação
│   └── userRoutes.js
│
├── middlewares/           # Funções que lidam com validações ou autenticações
│   └── authMiddleware.js
│
├── services/              # Serviços para integração com outros sistemas ou APIs
│   └── emailService.js
│
├── .env                   # Arquivo para variáveis de ambiente (configurações sensíveis)
│
├── .gitignore             # Arquivos e pastas que serão ignorados pelo Git
│
├── package.json           # Informações sobre dependências e scripts do projeto
│
├── server.js              # Arquivo principal que inicializa o servidor Express
│
└── README.md              # Documentação do projeto


Descrição das Pastas e Arquivos

config/:
Esta pasta contém a configuração do banco de dados. O arquivo database.js é responsável por estabelecer a conexão com o banco de dados MySQL, utilizando as credenciais definidas no arquivo .env.

controllers/:
Os controladores contêm a lógica de negócio da aplicação. Eles lidam com as requisições HTTP, interagem com o banco de dados e retornam as respostas adequadas para o cliente. Por exemplo, o userController.js define as funções para criar, listar, atualizar e deletar usuários.
routes/:

Aqui ficam definidas as rotas da aplicação. Cada rota mapeia um endpoint da API para uma função no controlador. O arquivo userRoutes.js define os endpoints relacionados à entidade user (usuário).

middlewares/:
Middlewares são funções que interceptam requisições antes de chegarem aos controladores. O arquivo authMiddleware.js contém, por exemplo, validações de autenticação e permissões.

services/:
Serviços são responsáveis por funcionalidades externas ou complexas, como envio de e-mails, integração com outros sistemas ou APIs. O emailService.js pode ser usado para enviar notificações via e-mail.

.env:
Arquivo que contém variáveis de ambiente, como credenciais de banco de dados, porta da aplicação, etc. Este arquivo não deve ser versionado pelo Git por questões de segurança.
.gitignore:

Arquivo que define quais arquivos e pastas devem ser ignorados pelo Git, como node_modules/ e o próprio .env.

package.json:
Arquivo que contém as dependências do projeto, scripts de execução e outras configurações importantes do projeto Node.js.

server.js:
Arquivo principal que inicializa o servidor Express, define middlewares globais, configura as rotas e estabelece a conexão com o banco de dados.

Como Executar:
Clone este repositório:
git clone https://github.com/seu-usuario/nome-do-projeto.git

Instale as dependências:
npm install

Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
PORT=3000

Inicie o servidor:
npm start

O servidor estará rodando em http://localhost:3000.

Divisão das Funções para 6 Pessoas
Aqui está a divisão das funções para a equipe de 6 pessoas, cobrindo os principais componentes do backend.

Pessoa 1: Configuração do Banco de Dados
Responsável pela criação e configuração da conexão MySQL no arquivo config/database.js.
Definir variáveis de ambiente relacionadas ao banco de dados.
Criar e manter o script de criação de tabelas.


Pessoa 2: Rotas
Configurar todas as rotas da API em routes/.
Trabalhar junto com os controladores para garantir que as rotas estejam funcionando corretamente.
Implementar o roteamento de rotas protegidas e públicas.


Pessoa 3: Controlador de Usuários
Criar o arquivo userController.js dentro da pasta controllers/.
Implementar as funções CRUD (criar, ler, atualizar e deletar usuários) e validar os dados de entrada.


Pessoa 4: Middleware de Autenticação
Desenvolver o middleware de autenticação JWT no arquivo middlewares/authMiddleware.js.
Garantir que apenas usuários autenticados possam acessar rotas protegidas.
Validar permissões de usuários (admin ou usuário comum) em certas rotas.


Pessoa 5: Serviço de E-mail (Opcional)
Implementar o serviço de envio de e-mails dentro de services/emailService.js.
Integrar a funcionalidade de envio de e-mails para notificações, como confirmação de cadastro ou agendamentos.


Pessoa 6: Integração Geral e Testes
Coordenar a integração entre as diferentes funcionalidades do sistema.
Garantir que todos os módulos funcionem juntos corretamente.
Escrever e executar testes básicos para verificar a funcionalidade da API.






