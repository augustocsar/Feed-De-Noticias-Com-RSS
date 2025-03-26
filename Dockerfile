# Usa a imagem oficial do node.js como base
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY src ./src

# Expõe a porta
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "src/server.js"]