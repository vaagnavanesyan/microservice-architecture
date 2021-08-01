Import-Module 'Carbon'

$hostname = "arch.homework"
Remove-HostsEntry -HostName $hostname
Set-HostsEntry -IPAddress "127.0.0.1" -HostName $hostname -Description "Host for OTUS labs"