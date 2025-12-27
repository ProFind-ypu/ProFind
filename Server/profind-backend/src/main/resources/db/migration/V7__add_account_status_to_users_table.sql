-- V7_add_account_status_to_users_table.sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS account_status VARCHAR(24);
ALTER TABLE project ADD COLUMN IF NOT EXISTS default_proposal_id BIGINT;
ALTER TABLE project ADD CONSTRAINT fk_project__default_proposal 
    FOREIGN KEY (default_proposal_id) REFERENCES proposal(id) ON DELETE SET NULL;