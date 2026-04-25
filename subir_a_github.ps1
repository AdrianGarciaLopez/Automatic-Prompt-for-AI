$gitPaths = @(
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
)

# Buscar en GitHub Desktop
$githubDesktopGit = Get-ChildItem -Path "$env:LOCALAPPDATA\GitHubDesktop" -Filter "git.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName -First 1
if ($githubDesktopGit) {
    $gitPaths += $githubDesktopGit
}

$gitExe = $null
foreach ($path in $gitPaths) {
    if (Test-Path $path) {
        $gitExe = $path
        break
    }
}

if ($gitExe) {
    Write-Host "Git encontrado en: $gitExe"
    & $gitExe init
    & $gitExe add .
    & $gitExe commit -m "Auto-commit desde Antigravity"
    & $gitExe branch -M main
    & $gitExe remote remove origin 2>$null
    & $gitExe remote add origin https://github.com/AdrianGarciaLopez/Automatic-Prompt-for-AI.git
    & $gitExe push -u origin main
    Write-Host "¡Subida completada con éxito!"
} else {
    Write-Host "ERROR: No se ha podido encontrar Git instalado en el sistema."
    Write-Host "Por favor, descarga e instala Git desde https://gitforwindows.org/"
}

Write-Host "Presiona cualquier tecla para salir..."
$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
