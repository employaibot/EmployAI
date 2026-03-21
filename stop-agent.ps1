$pidsFile = "$PSScriptRoot\.agent-pids"
if (Test-Path $pidsFile) {
    Get-Content $pidsFile | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    Remove-Item $pidsFile
}

# Fallback: kill by name in case processes outlived their terminal
Stop-Process -Name "ngrok" -Force -ErrorAction SilentlyContinue

Write-Host "Agent pipeline stopped."
