minikube stop
minikube delete
minikube config set driver hyperv
minikube start
kubectl create ns otus
kubectl config set-context --current --namespace=otus
minikube addons enable ingress