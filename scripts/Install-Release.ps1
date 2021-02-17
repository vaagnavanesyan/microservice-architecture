Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Build-Dependencies.ps1")
helm install api-gateway .\api-gateway-chart