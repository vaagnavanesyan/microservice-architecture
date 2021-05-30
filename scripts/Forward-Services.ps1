
Write-Host 💹 Forwarding Dashboard...
$dashboard = Start-Job -ScriptBlock { kubectl port-forward service/kubernetes-dashboard 8080:80 -n kubernetes-dashboard }

Write-Host 🆖 Forwarding NGinx...
$nginx = Start-Job -ScriptBlock { kubectl port-forward service/infrastructure-ingress-nginx-controller 80 -n otus }

Write-Host 🔥 Forwarding Prometheus...
$prometheus = Start-Job -ScriptBlock { kubectl port-forward service/prometheus-operated 9090 -n otus }

Write-Host 🍥 Forwarding Grafana...
$grafana = Start-Job -ScriptBlock { kubectl port-forward service/infrastructure-grafana 9091:80 -n otus }

Write-Host 🦩 Forwarding minIO...
$minio = Start-Job -ScriptBlock { kubectl port-forward service/infrastructure-minio 9000 -n otus }

Write-Host 🐰 Forwarding RabbitMQ...
$rabbitmq = Start-Job -ScriptBlock { kubectl port-forward services/infrastructure-rabbitmq 15672 5672 -n otus }

try {
    while ($true) {
        $dashboard | Receive-Job
        $nginx | Receive-Job
        $prometheus | Receive-Job
        $grafana | Receive-Job
        $minio | Receive-Job
        $rabbitmq | Receive-Job
    }
}
finally {
    Write-Host 💹 Detaching from Dashboard...
    $dashboard | Stop-Job

    Write-Host 🆖 Detaching from NGinx...
    $nginx | Stop-Job

    Write-Host 🔥 Detaching from Prometheus...
    $prometheus | Stop-Job

    Write-Host 🍥 Detaching from Grafana...
    $grafana | Stop-Job

    Write-Host 🦩 Detaching from minIO...
    $minio | Stop-Job

    Write-Host 🐰 Detaching from rabbitMQ...
    $rabbitmq | Stop-Job
}