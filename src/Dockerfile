# Use uma imagem base do Node.js
FROM node:18 as build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código fonte para a imagem
COPY . .

# Execute o build do Angular
RUN npm run build -- --output-path=dist

# Use uma imagem base do NGINX para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos construídos para a pasta de conteúdo estático do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 para o tráfego HTTP
EXPOSE 80

# Comando para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]
