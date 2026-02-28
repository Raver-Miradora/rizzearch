# helper script to launch backend and frontend for local development
# run from workspace root: .\run_dev.ps1

# ensure .env exists
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env created from example. Please edit it if needed."
}

# backend
Write-Host "Starting backend..."
Push-Location server
if (-not (Test-Path ".venv")) {
    python -m venv .venv
}
. .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Start-Process -FilePath "python" -ArgumentList "-m uvicorn app.main:app --reload --port 8000" -NoNewWindow
Pop-Location

# frontend
Write-Host "Starting frontend..."
Push-Location client
if (-not (Test-Path "node_modules")) {
    npm install
}
npm run dev
Pop-Location
