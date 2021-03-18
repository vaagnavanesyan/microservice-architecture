minikube stop -p otus
minikube delete -p otus
minikube config set driver hyperv
minikube start -p otus
minikube profile otus

Write-Host 🔥 Installing Prometheus
kubectl create ns monitoring
kubectl config set-context --current --namespace=monitoring
helm install prom prometheus-community/kube-prometheus-stack  --atomic -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/prometheus.yaml")

Write-Host 🆖 Installing Nginx
helm install nginx ingress-nginx/ingress-nginx --atomic -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/nginx-ingress.yaml")

Write-Host 🦉 Setting default namespace to "otus"
kubectl apply -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/create-otus-ns.yaml")
kubectl config set-context --current --namespace=otus

Write-Host Adding minikube ip to local hosts...
Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Update-Hosts.ps1")
