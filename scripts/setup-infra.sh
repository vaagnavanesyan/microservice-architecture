#!/bin/bash

dir_path=$(dirname $(realpath $0))
echo $dir_path
kubectl create ns otus

echo 🔥 Installing Prometheus
kubectl create ns monitoring
helm install prom prometheus-community/kube-prometheus-stack  --atomic -n monitoring -f "$dir_path/configs/prometheus.yaml"

echo 🆖 Installing Nginx
helm install nginx ingress-nginx/ingress-nginx --atomic -f "$dir_path/configs/nginx-ingress.yaml"

echo 🐇 Installing RabbitMQ...
helm install rabbitmq bitnami/rabbitmq --set auth.username=user --set auth.password=bX1DTrlOfH -n otus