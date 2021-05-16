kubectl create ns otus

Write-Host 🔥 Installing Prometheus
kubectl create ns monitoring
helm install prom prometheus-community/kube-prometheus-stack  --atomic -n monitoring -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/prometheus.yaml")

Write-Host 🆖 Installing Nginx
helm install nginx ingress-nginx/ingress-nginx --atomic -f $(Join-Path -Path $PSScriptRoot -ChildPath "./configs/nginx-ingress.yaml")

Write-Host 🐇 Installing RabbitMQ...
helm install rabbitmq bitnami/rabbitmq --set auth.username=user --set auth.password=bX1DTrlOfH -n otus