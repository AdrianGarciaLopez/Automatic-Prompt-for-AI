$gitExe = "C:\Program Files\Git\cmd\git.exe"

Write-Host "Configurando Git..."
& $gitExe config user.email "adriangarcialopez@users.noreply.github.com"
& $gitExe config user.name "Adrian Garcia Lopez"

Write-Host "Realizando commit..."
& $gitExe add .
& $gitExe commit -m "Auto-commit de Decision Pilot IA"
& $gitExe branch -M main

Write-Host "Subiendo a GitHub..."
& $gitExe push -u origin main
