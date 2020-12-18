minikube stop
minikube delete
minikube config set driver hyperv
minikube start
kubectl create ns monitoring
kubectl config set-context --current --namespace=monitoring
helm install prom prometheus-community/kube-prometheus-stack  --atomic -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/prometheus.yaml")
helm install nginx ingress-nginx/ingress-nginx --atomic -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/nginx-ingress.yaml")

kubectl create ns otus
kubectl config set-context --current --namespace=otus