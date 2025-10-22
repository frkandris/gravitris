# Migrate from Prisma.io to Neon

## Steps to migrate your existing data:

### 1. Export from old database:
```bash
pg_dump "postgres://dd1ce1b55ecb8e106dbe898b7cb52b1a1c4196385bb9ce13cf2296edf8cd59fd:sk_9Imr0QM2HtzrH3Z3ccXpC@db.prisma.io:5432/postgres" > backup.sql
```

### 2. After Neon is set up, import to new database:
```bash
# Get DATABASE_URL from Vercel environment variables
psql "your-neon-database-url" < backup.sql
```

### 3. Or just push schema to new DB and start fresh:
```bash
npx prisma db push
```

## Note:
If you want to start fresh (no existing games data), just run:
```bash
npx prisma db push
```
This will create all tables in the new Neon database.
