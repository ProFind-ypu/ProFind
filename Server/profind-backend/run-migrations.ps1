# PowerShell script to run Flyway migrations manually
# Usage: .\run-migrations.ps1

Write-Host "Checking Flyway migration status..." -ForegroundColor Cyan

# Check if database is accessible
$dbCheck = Test-NetConnection -ComputerName localhost -Port 5432 -WarningAction SilentlyContinue
if (-not $dbCheck.TcpTestSucceeded) {
    Write-Host "ERROR: Cannot connect to PostgreSQL on localhost:5432" -ForegroundColor Red
    Write-Host "Please ensure PostgreSQL is running." -ForegroundColor Yellow
    exit 1
}

Write-Host "Database is accessible. Running Flyway migrations..." -ForegroundColor Green

# Run Flyway info to check status
Write-Host "`n=== Flyway Migration Status ===" -ForegroundColor Cyan
mvn flyway:info `
    "-Dflyway.url=jdbc:postgresql://localhost:5432/profind_db" `
    "-Dflyway.user=profind" `
    "-Dflyway.password=profindpass"

Write-Host "`n=== Running Migrations ===" -ForegroundColor Cyan
mvn flyway:migrate `
    "-Dflyway.url=jdbc:postgresql://localhost:5432/profind_db" `
    "-Dflyway.user=profind" `
    "-Dflyway.password=profindpass"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Migrations completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Migration failed. Check the error messages above." -ForegroundColor Red
}

