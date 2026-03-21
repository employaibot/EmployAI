$envFile = Join-Path $PSScriptRoot ".env.local"
$agentSecret = ((Get-Content $envFile | Where-Object { $_ -match '^AGENT_SECRET=' }) -replace '^AGENT_SECRET=', '').Trim()

Start-Process powershell -ArgumentList '-NoExit', '-Command', 'ngrok http 3001'

Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd `"$PSScriptRoot\agent-listener`"; `$env:AGENT_SECRET='$agentSecret'; node server.js"

Write-Host "Agent pipeline started."
