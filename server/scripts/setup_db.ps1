<#
PowerShell helper for creating the Rizzearch database and user.
Usage (run from the workspace root):

    cd server\scripts
    .\setup_db.ps1 -DbPass "secret123"

It assumes `psql` is on your PATH and that the postgres server is running.
You will be prompted for the superuser password.
#>
param(
    [string]$PostgresUser = "postgres",
    [string]$DbName = "rizzearch",
    [string]$DbUser = "rizzearch_user",
    [string]$DbPass = "yourpass"
)

Write-Host "Creating database '$DbName'..."
psql -U $PostgresUser -c "CREATE DATABASE \"$DbName\";"

Write-Host "Creating user '$DbUser'..."
psql -U $PostgresUser -c "CREATE USER \"$DbUser\" WITH ENCRYPTED PASSWORD '$DbPass';"

Write-Host "Granting privileges..."
psql -U $PostgresUser -c "GRANT ALL PRIVILEGES ON DATABASE \"$DbName\" TO \"$DbUser\";"

Write-Host "Done. update DATABASE_URL in .env and start the app as described in README."