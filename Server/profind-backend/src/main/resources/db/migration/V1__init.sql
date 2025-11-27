CREATE TABLE users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  uni_id VARCHAR(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  role varchar(50),
  full_name varchar(255),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE project (
  id serial PRIMARY KEY,
  professor_id bigint NOT NULL,
  title varchar(255),
  status varchar(50),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE refresh_token (
  id bigserial PRIMARY KEY,
  token varchar(512) NOT NULL UNIQUE,
  user_id bigint NOT NULL,
  expiry_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_refresh_token_user ON refresh_token(user_id);

