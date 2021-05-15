Write-Host 🔥 Starting Prometheus...
$prometheus = Start-Job -ScriptBlock { kubectl port-forward service/prometheus-operated 9090 -n monitoring }
Write-Host 🍥 Starting Grafana...
$grafana = Start-Job -ScriptBlock { kubectl port-forward service/prom-grafana 9091:80 -n monitoring }
Write-Host 🦩 Starting minIO...
$minio = Start-Job -ScriptBlock { kubectl port-forward service/infrastructure-minio 9000 -n otus }
Write-Host 🐰 Starting RabbitMQ...
$rabbitmq = Start-Job -ScriptBlock { kubectl port-forward services/infrastructure-rabbitmq 15672 5672 -n otus }

try {
    while ($true) {
        $prometheus | Receive-Job
        $grafana | Receive-Job
        $minio | Receive-Job
        $rabbitmq | Receive-Job
    }
}
finally {
    Write-Host 🔥 Stopping Prometheus...
    $prometheus | Stop-Job

    Write-Host 🍥 Stopping Grafana...
    $grafana | Stop-Job

    Write-Host 🦩 Stopping minIO...
    $minio | Stop-Job

    Write-Host 🐰 Stopping rabbitMQ...
    $rabbitmq | Stop-Job
}