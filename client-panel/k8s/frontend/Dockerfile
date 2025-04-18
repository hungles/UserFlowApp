# Etapa 1: Construcción
FROM node:22.14 AS build

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiar los archivos estáticos generados en la etapa de construcción al directorio de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar un archivo de configuración personalizado de Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que Nginx sirve la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]