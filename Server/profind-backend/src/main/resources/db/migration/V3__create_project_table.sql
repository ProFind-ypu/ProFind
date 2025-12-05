-- Create refresh_token table
CREATE TABLE refresh_token (
  id bigserial PRIMARY KEY,
  token varchar(512) NOT NULL UNIQUE,
  user_id bigint NOT NULL,
  expiry_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_refresh_token_user ON refresh_token(user_id);
CREATE INDEX IF NOT EXISTS idx_project_professor ON project(professor_id);
CREATE INDEX IF NOT EXISTS idx_project_status ON project(status);
CREATE INDEX IF NOT EXISTS idx_project_title ON project USING gin (to_tsvector('english', title));

