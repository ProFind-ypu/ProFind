# Fix Missing Database Tables

The tables `supervision_request`, `assignment`, and `outbox_event` are missing because Flyway migrations haven't run yet.

## Quick Fix Options

### Option 1: Run Migrations via Maven (Recommended)

**Windows (PowerShell):**
```powershell
cd ProFind/Server/profind-backend
.\run-migrations.ps1
```

**Linux/Mac:**
```bash
cd ProFind/Server/profind-backend
chmod +x run-migrations.sh
./run-migrations.sh
```

**Or manually:**
```bash
cd ProFind/Server/profind-backend
mvn flyway:migrate \
    -Dflyway.url=jdbc:postgresql://localhost:5432/profind_db \
    -Dflyway.user=profind \
    -Dflyway.password=profindpass
```

### Option 2: Run Migrations via Spring Boot

Simply start your Spring Boot application - Flyway will automatically run migrations on startup:

```bash
cd ProFind/Server/profind-backend
mvn spring-boot:run
```

The migrations will run automatically when the app starts (if `spring.flyway.enabled=true` in `application.properties`).

### Option 3: Run SQL Manually (If Migrations Fail)

If Flyway is having issues, you can run the SQL files manually:

```bash
# Connect to PostgreSQL
psql -U profind -d profind_db

# Then run each migration file in order:
# 1. V1__init.sql
# 2. V2__add_missing_columns.sql
# 3. V3__create_project_table.sql
# 4. V4__create_remaining_tables.sql
```

Or use psql command line:
```bash
psql -U profind -d profind_db -f src/main/resources/db/migration/V1__init.sql
psql -U profind -d profind_db -f src/main/resources/db/migration/V2__add_missing_columns.sql
psql -U profind -d profind_db -f src/main/resources/db/migration/V3__create_project_table.sql
psql -U profind -d profind_db -f src/main/resources/db/migration/V4__create_remaining_tables.sql
```

## Check Migration Status

To see which migrations have been applied:

**Windows:**
```powershell
mvn flyway:info `
    "-Dflyway.url=jdbc:postgresql://localhost:5432/profind_db" `
    "-Dflyway.user=profind" `
    "-Dflyway.password=profindpass"
```

**Linux/Mac:**
```bash
mvn flyway:info \
    -Dflyway.url=jdbc:postgresql://localhost:5432/profind_db \
    -Dflyway.user=profind \
    -Dflyway.password=profindpass
```

## Verify Tables Exist

After running migrations, verify the tables exist:

```sql
-- Connect to database
psql -U profind -d profind_db

-- List all tables
\dt

-- Or check specific tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('supervision_request', 'assignment', 'outbox_event');
```

## Troubleshooting

### Issue: "Flyway schema history table does not exist"
**Solution:** Flyway will create it automatically on first run. Just run `mvn flyway:migrate`.

### Issue: "Migration checksum mismatch"
**Solution:** This happens if migration files were modified after being applied. Options:
1. Fix the migration files to match what was applied
2. Use `mvn flyway:repair` to update checksums
3. Or reset Flyway: `DROP TABLE flyway_schema_history;` then re-run migrations

### Issue: "Connection refused"
**Solution:** 
- Ensure PostgreSQL is running: `docker-compose up -d db` (if using Docker)
- Or check PostgreSQL service: `pg_ctl status` (if installed locally)
- Verify connection: `psql -U profind -d profind_db -h localhost`

### Issue: "Authentication failed"
**Solution:**
- Verify username/password in `application.properties`
- Check PostgreSQL user exists: `psql -U postgres -c "\du"`
- Create user if needed: `CREATE USER profind WITH PASSWORD 'profindpass';`

## Expected Tables After Migration

After successful migration, you should have these tables:
- `users`
- `project`
- `refresh_token`
- `supervision_request` ✅
- `assignment` ✅
- `outbox_event` ✅
- `department`
- `profile`
- `project_file`
- `proposal`
- `availability_slot`
- `notification`
- `audit_log`
- `flyway_schema_history` (Flyway's tracking table)

