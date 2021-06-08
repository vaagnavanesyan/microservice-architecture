
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

Write-Host Forwarding databases...
$billing_db = Start-Job -ScriptBlock { kubectl port-forward service/billing-api-postgresql 30020:5432 -n otus }
$identity_db = Start-Job -ScriptBlock { kubectl port-forward service/identity-postgresql 32534:5432 -n otus }
$notifications_db = Start-Job -ScriptBlock { kubectl port-forward service/notifications-api-postgresql 30030:5432 -n otus }
$orders_db = Start-Job -ScriptBlock { kubectl port-forward service/orders-api-postgresql 30001:5432 -n otus }
try {
    while ($true) {
        $dashboard | Receive-Job
        $nginx | Receive-Job
        $prometheus | Receive-Job
        $grafana | Receive-Job
        $minio | Receive-Job
        $rabbitmq | Receive-Job
        $billing_db | Receive-Job
        $identity_db | Receive-Job
        $notifications_db | Receive-Job
        $orders_db | Receive-Job

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

    Write-Host Detaching from databases...
    $billing_db | Stop-Job
    $identity_db | Stop-Job
    $notifications_db | Stop-Job
    $orders_db | Stop-Job
}