#!/bin/bash

# Colores para mejor visibilidad
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

# Función para verificar e instalar una herramienta
check_or_install() {
  local tool=$1
  local install_cmd=$2
  local check_cmd=$3

  if ! command -v $tool &> /dev/null; then
    echo -e "${YELLOW}$tool no está instalado.${NC}"
    read -p "¿Deseas instalar $tool? [s/N]: " confirm
    if [[ "$confirm" =~ ^[sS]$ ]]; then
      echo -e "${GREEN}Instalando $tool...${NC}"
      eval "$install_cmd"
      if ! command -v $tool &> /dev/null; then
        echo -e "${RED}Error: $tool no se pudo instalar correctamente.${NC}"
        exit 1
      fi
    else
      echo "No se instalará $tool. Abortando."
      exit 1
    fi
  else
    echo -e "${GREEN}$tool ya está instalado.${NC}"
  fi
}

# Instalación de kubectl (solo Linux)
install_kubectl="curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && \
chmod +x kubectl && sudo mv kubectl /usr/local/bin/"

# Instalación de minikube (solo Linux)
install_minikube="curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && \
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64"

# Verificaciones
check_or_install "kubectl" "$install_kubectl"
check_or_install "minikube" "$install_minikube"

# Crear el cluster con minikube
echo -e "${GREEN}Creando el cluster 'userflow-cluster' con un solo nodo...${NC}"
minikube start --nodes=1 --driver=docker -p userflow-cluster

# Usar el perfil correcto por si hay varios clusters
minikube profile userflow-cluster

# Instalar addon de ingress
echo -e "${GREEN}Habilitando el addon de ingress...${NC}"
minikube addons enable ingress

#Subir imagenes al cluster
eval $(minikube -p userflow-cluster docker-env)
echo -e "${GREEN}Subiendo imagenes al cluster...${NC}"
cd frontend/ && docker build -t userflow-frontend:latest . && cd ..
cd backend/create-user-service/ && docker build -t userflow-backend:latest . && cd ../..

kubectl apply -f frontend/Deployment.yml
kubectl apply -f frontend/Service.yml
kubectl apply -f backend/create-user-service/Deployment.yml
kubectl apply -f backend/create-user-service/Service.yml
kubectl apply -f ingress.yml

echo -e "${GREEN}Todo listo. Cluster creado y addon de ingress habilitado.${NC}"
