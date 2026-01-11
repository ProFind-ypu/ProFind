ALTER TABLE supervision_request
ADD COLUMN IF NOT EXISTS form_data jsonb;
