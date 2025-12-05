-- Add missing columns to users and project tables
ALTER TABLE users ADD COLUMN IF NOT EXISTS uni_id VARCHAR(255) UNIQUE;

-- Add missing columns to project table
ALTER TABLE project ADD COLUMN IF NOT EXISTS short_description varchar(1024);
ALTER TABLE project ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE project ADD COLUMN IF NOT EXISTS requirements text;
ALTER TABLE project ADD COLUMN IF NOT EXISTS tags jsonb;
ALTER TABLE project ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
