$gitExe = "C:\Program Files\Git\cmd\git.exe"

# Eliminar los scripts temporales si existen, para no ensuciar el proyecto final
if (Test-Path "subir_a_github.ps1") { Remove-Item "subir_a_github.ps1" }
if (Test-Path "subir_a_github2.ps1") { Remove-Item "subir_a_github2.ps1" }

Write-Host "Realizando commit final..."
& $gitExe add .
& $gitExe commit -m "Versión Final"

Write-Host "Subiendo a GitHub..."
& $gitExe push origin main
