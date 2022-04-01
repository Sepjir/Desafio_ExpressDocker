# Versión de node con la que correrá la aplicación web
FROM node:14

# Creamos un directorio interno en el contenedor donde se copiara nuestra aplicación web
WORKDIR /usr/src/app

# Instalación de dependencias
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Copiamos los archivos del proyecto
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]