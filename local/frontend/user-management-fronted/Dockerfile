# Usa la imagen oficial de Node.js como base
FROM node:latest AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu proyecto
RUN npm install

# Copia el resto de tu código fuente al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:latest

# Copia el contenido de la carpeta build (que contiene la app compilada) al contenedor
COPY --from=build /app/dist /usr/share/nginx/html

# Expon el puerto en el que estará sirviendo Nginx
EXPOSE 80

# Ejecuta Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]