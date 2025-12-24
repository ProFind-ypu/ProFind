-- V6__link_project_and_proposal.sql
-- 1) Create/Update proposal table columns
ALTER TABLE proposal ADD COLUMN IF NOT EXISTS professor_id bigint;
ALTER TABLE proposal ADD COLUMN IF NOT EXISTS project_id bigint;
ALTER TABLE proposal ADD COLUMN IF NOT EXISTS message text;
ALTER TABLE proposal ADD COLUMN IF NOT EXISTS form_data jsonb;

-- 2) Link Project to Proposal (1:1)
-- This ensures one project can only have one associated request/proposal
ALTER TABLE project ADD COLUMN IF NOT EXISTS proposal_id bigint UNIQUE;

-- 3) Add foreign keys
ALTER TABLE project ADD CONSTRAINT fk_project_proposal 
    FOREIGN KEY (proposal_id) REFERENCES proposal(id) ON DELETE SET NULL;

ALTER TABLE proposal ADD CONSTRAINT fk_proposal_professor 
    FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE SET NULL;

-- Optional: Link proposal back to project if needed
ALTER TABLE proposal ADD CONSTRAINT fk_proposal_project 
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE SET NULL;
