Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Uninstall-Release.ps1")
Invoke-Expression $(Join-Path -Path $PSScriptRoot -ChildPath "Install-Release.ps1")