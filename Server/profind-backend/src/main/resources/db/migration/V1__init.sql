CREATE TABLE users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
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

-- Add other tables gradually...
