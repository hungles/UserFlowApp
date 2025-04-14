# UserFlowApp Deployment Guide

This project provides two deployment options: **Local Deployment with Docker and Docker Compose** and **Local Kubernetes Deployment**.

## Local Deployment with Docker and Docker Compose

1. Ensure you have Docker and Docker Compose installed on your system.
2. Navigate to the project directory and execute the following command to build and start the containers:
    ```bash
    docker-compose up -d --build
    ```
3. Once the containers are running, you can access the application at:
    [http://localhost](http://localhost)

## Local Kubernetes Deployment
1. Ensure you have a local Kubernetes cluster, such as Minikube, set up on your system.
2. Configure Docker to use the Minikube Docker daemon by running:
    ```bash
    eval $(minikube docker-env)
    ```
3. Navigate to the directory of each program in the project and build the Docker images using the respective Dockerfiles. For example:
    ```bash
    docker build -t <image-name> .
    ```
   Replace `<image-name>` with the desired name for your Docker image.
4. Deploy the infrastructure by executing the following command:
    ```bash
    ./deploy-infra.sh
    ```
    
Follow these steps to deploy and test the application in your preferred environment.