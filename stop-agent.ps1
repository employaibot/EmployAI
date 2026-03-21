Stop-Process -Name "ngrok" -ErrorAction SilentlyContinue
Stop-Process -Name "node" -ErrorAction SilentlyContinue
Write-Host "Agent pipeline stopped."
