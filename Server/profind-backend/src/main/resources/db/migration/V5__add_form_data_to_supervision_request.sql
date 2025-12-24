-- V5__add_form_data_to_supervision_request.sql
ALTER TABLE supervision_request ADD COLUMN IF NOT EXISTS form_data jsonb;
