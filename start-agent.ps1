$envFile = "$PSScriptRoot\.env.local"
$agentSecret = (Get-Content $envFile | Where-Object { $_ -match '^AGENT_SECRET=' } | Select-Object -First 1) -replace '^AGENT_SECRET=', ''

$ngrokProc = Start-Process powershell -ArgumentList '-NoExit', '-Command', 'ngrok http 3001' -PassThru

Start-Sleep -Seconds 3

$nodeProc = Start-Process powershell -ArgumentList '-NoExit', '-Command', "cd `"$PSScriptRoot\agent-listener`"; `$env:AGENT_SECRET='$agentSecret'; node server.js" -PassThru

"$($ngrokProc.Id)`n$($nodeProc.Id)" | Set-Content "$PSScriptRoot\.agent-pids"

Write-Host "Agent pipeline started."
