kubectl delete -f frontend/user-management-fronted/deployment.yml
kubectl delete -f frontend/user-management-fronted/service.yml
kubectl delete -f backend/deployment.yml
kubectl delete -f backend/service.yml
kubectl delete -f ingress.yml
