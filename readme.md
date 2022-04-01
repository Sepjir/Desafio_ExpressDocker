1. Crear base de datos "tareas"
2. Correr en terminal el comando: npm run migrate:db para creacion de tablas
3. Crear imagen con docker con comando en terminal: docker build . -t app-node-js
4. ejecutar la imagen con el siguiente comando en terminal: docker run -d -p 4000:4000 app-node-js
5. acceder a la aplicación a través de la direccion: http://locahost:4000/