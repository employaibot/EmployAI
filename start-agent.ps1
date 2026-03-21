Start-Process powershell -ArgumentList '-NoExit', '-Command', 'ngrok http 3001'

Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd "$PSScriptRoot\agent-listener"; $env:AGENT_SECRET="employai-secret-123"; node server.js'

Write-Host "Agent pipeline started."
