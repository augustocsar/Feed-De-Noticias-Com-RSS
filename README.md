# Sprint 2 e 3 - Feed de notícias com RSS

Programa para visualisação de feed de notícias do portal G1 através do RSS. Projeto dockerizado e executando na nuvem através da AWS.

---

# 🔨 Funcionalidades

- **Exibição do feed de notícias:** Exibe as noticias através do RSS do portal G1.
- **Notícias por categoria:** Exibe as notícias com base da categoria selecionada.

---

# 👨‍💻 Como utilizar o sistema

### **Pelo link:**

- Acesse o link `http://15.229.9.157:3000` através do navegador, e escolha a opção de categoria de notícias.

### **Clonando o repositório:**

- Instale o programa do [Docker](https://docs.docker.com/desktop/setup/install/windows-install/).
- Abra o Docker.
- Clone o repositório do projeto no [github](https://github.com/Compass-pb-aws-2024-DEZEMBRO/sprints-2-3-pb-aws-dezembro/tree/grupo-8).
- Crie o arquivo `.env` na raiz do projeto. O arquivo pode estar vazio.
- Abra o terminal na raiz do projeto.
- Use o comando `docker-compose build` para criar o container.
- Use o comando `docker-compose up -d` para executar o container.
- Acesse o link `http://localhost:3000`.

Nota: Clonando o repositório, é necessário preencher as credênciais no ``.env`` com as informações dos autores do projeto. 

---

# ⚙️ Tecnologias utilizadas

- `JavaScript`: Linguagem utilizada na API.
- `HTML/CSS`: Utilizado na interface do projeto.
- `Docker`: Transforma o sistema em container.
- `VSCode`: IDE utilizada para desenvolver o projeto.
- `AWS` :
    - `bucket S3`: Usado pra guardar arquivo JSON do RSS, 
    - `Instância do EC2`: Usado para hospedar e executar o projeto.

---

# 📁 Estrutura do projeto

```
📦app
 ┣ 📂src
 ┃ ┣ 📂aws
 ┃ ┃ ┗ 📜s3Service.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜rssController.js
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜script.js
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜routes.js
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜rssService.js
 ┃ ┣ 📜server.js
 ┃ ┗ 📜test.js
 ┣ 📜.dockerignore
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

# 📂 Diagramas

<img src="img/Arquitetura Geral.jpg" width="450" height="400">

<img src="img/Diagrama de sequência.jpg" width="450" height="400">

---

# ❌ Dificuldades do projeto

### **Docker:**

- Estudar o funcionamento do docker.
- Utilização do docker-compose.
- Utilização das variáveis de ambiente.
- Problemas de duplicação do `node_modules` ao criar a imagem do container.

### **AWS:**

- Conexão via SSH na instância EC2.
- Configuração do Container na Máquina Virtual do EC2.

### **Aplicação:**


- Configurações de ambiente.
- Dificuldade ao tentar acessar a API do frontend, gerando necessidade de entender e configurar o CORS corretamente.
- A dificuldade ao tentar acessar a API gerou a necessidade de aprender e utilizar o express.static, que é outra forma de resolver o problema que era solucionado pelo CORS.

---

# 🧑‍💻 Autor

- [Augusto César Farias Carvalho](https://github.com/augustocsar)

