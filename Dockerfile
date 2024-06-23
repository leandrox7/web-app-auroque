# Use a imagem base do Node.js com Alpine
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json do diretório superior
COPY ../package*.json ./

# Instala globalmente o Angular CLI
RUN npm install -g @angular/cli

# Instala as dependências do projeto
RUN npm install

# Copia todo o conteúdo do diretório atual para o diretório de trabalho no container
COPY . .

# Expõe a porta em que a aplicação Angular irá rodar
EXPOSE 4200

# Comando para iniciar a aplicação Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
