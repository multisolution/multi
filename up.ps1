Start-Process powershell { docker-compose.exe up }
Start-Process -WorkingDirectory ".\web\" powershell { npm.cmd run dev }
Start-Process "http://localhost:3000"
