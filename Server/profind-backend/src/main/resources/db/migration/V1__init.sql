-- Initial schema: users and project tables
-- Note: Tables may already exist from previous migration, but Flyway will track this migration
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE users (
          id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          email varchar(255) NOT NULL UNIQUE,
          password_hash varchar(255) NOT NULL,
          role varchar(50),
          full_name varchar(255),
          created_at timestamptz DEFAULT now()
        );
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'project') THEN
        CREATE TABLE project (
          id bigserial PRIMARY KEY,
          professor_id bigint NOT NULL,
          title varchar(255) NOT NULL,
          status varchar(50) DEFAULT 'OPEN',
          updated_at timestamptz DEFAULT now()
        );
    END IF;
END $$;
