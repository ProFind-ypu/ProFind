#!/bin/bash
# Bash script to run Flyway migrations manually
# Usage: ./run-migrations.sh

echo "Checking Flyway migration status..."

# Check if database is accessible
if ! nc -z localhost 5432 2>/dev/null; then
    echo "ERROR: Cannot connect to PostgreSQL on localhost:5432"
    echo "Please ensure PostgreSQL is running."
    exit 1
fi

echo "Database is accessible. Running Flyway migrations..."

# Run Flyway info to check status
echo ""
echo "=== Flyway Migration Status ==="
mvn flyway:info \
    -Dflyway.url=jdbc:postgresql://localhost:5432/profind_db \
    -Dflyway.user=profind \
    -Dflyway.password=profindpass

echo ""
echo "=== Running Migrations ==="
mvn flyway:migrate \
    -Dflyway.url=jdbc:postgresql://localhost:5432/profind_db \
    -Dflyway.user=profind \
    -Dflyway.password=profindpass

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migrations completed successfully!"
else
    echo ""
    echo "❌ Migration failed. Check the error messages above."
fi

