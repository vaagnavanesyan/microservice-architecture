Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Build-Dependencies.ps1")
helm install user-api .\user-api-chart