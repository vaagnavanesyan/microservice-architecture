Import-Module 'Carbon'
$minikubeIP = minikube ip -p otus
$hostname = "arch.homework"
Remove-HostsEntry -HostName $hostname
Set-HostsEntry -IPAddress $minikubeIP -HostName $hostname -Description "Host for OTUS labs"