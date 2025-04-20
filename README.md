# UserFlowApp Deployment Guide

This project provides two deployment options: **Local Deployment with Docker and Docker Compose** and **Local Kubernetes Deployment**.

## Local Deployment with Docker and Docker Compose

1. Ensure you have Docker and Docker Compose installed on your system.
2. Navigate to the project directory and execute the following command to build and start the containers:
    ```bash
    docker-compose up -d --build
    ```
3. Once the containers are running, you can access the application at:
    [http://localhost:8080](http://localhost:8080)

# Local Deployment with Kubernetes

## 📦 Requirements

Before running the installation script, make sure you have:

- A Linux operating system (for Minikube compatibility).
- Execution permissions for the `deploy.sh` script.

## 🚀 Installation and Deployment

The `deploy.sh` script performs the following steps automatically:

1. Installs **kubectl** if it's not already present.
2. Installs **Minikube** if it's not installed.
3. Starts Minikube.
4. Deploys the application to the Kubernetes cluster.

### 🔧 Run the Script

Open a terminal in the root of the project and run:

```bash
./deploy.sh
