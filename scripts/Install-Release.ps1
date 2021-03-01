Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Build-Dependencies.ps1")
helm install identity .\identity-chart