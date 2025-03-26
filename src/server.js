// server.js
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import routes from './routes/routes.js';
import cors from 'cors';

// Configuração para __dirname funcionar com ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Adicione o CORS antes dos outros middlewares
app.use(cors());

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas da API
app.use('/api', routes);

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('API RSS está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});