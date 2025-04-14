kubectl apply -f frontend/user-management-fronted/deployment.yml
kubectl apply -f frontend/user-management-fronted/service.yml
kubectl apply -f backend/deployment.yml
kubectl apply -f backend/service.yml
kubectl apply -f ingress.yml
