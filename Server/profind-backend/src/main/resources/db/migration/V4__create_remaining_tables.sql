-- V4__create_remaining_tables.sql
-- Creates profiles, departments, project_files, supervision_requests, proposals,
-- assignments, availability_slots, notifications, audit_log, outbox_event
-- and supporting triggers/functions for updated_at.
-- Written with IF NOT EXISTS guards for safe re-run.

-- 1) Departments (reference table)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'department') THEN
    CREATE TABLE department (
      id bigserial PRIMARY KEY,
      name varchar(255) NOT NULL,
      code varchar(50),
      created_at timestamptz DEFAULT now()
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_department_code ON department(code);
  END IF;
END $$;

-- 2) Profiles (one-to-one with users)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profile') THEN
    CREATE TABLE profile (
      user_id bigint PRIMARY KEY, 
      bio text,
      department_id bigint,
      skills text,        
      avatar_url varchar(1024),
      cv_url varchar(1024),
      alt_email varchar(1024),
      telephonenumber varchar(1024),
      updated_at timestamptz DEFAULT now()
    );
    ALTER TABLE profile ADD CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    ALTER TABLE profile ADD CONSTRAINT fk_profile_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3) Project files (metadata only; files in S3)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'project_file') THEN
    CREATE TABLE project_file (
      id bigserial PRIMARY KEY,
      project_id bigint NOT NULL,
      uploaded_by bigint,
      filename varchar(1024) NOT NULL,
      url varchar(2048) NOT NULL,
      mime_type varchar(255),
      uploaded_at timestamptz DEFAULT now()
    );
    ALTER TABLE project_file ADD CONSTRAINT fk_projectfile_project FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE;
    ALTER TABLE project_file ADD CONSTRAINT fk_projectfile_uploader FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS idx_projectfile_project ON project_file(project_id);
  END IF;
END $$;

-- 4) Supervision requests (student -> professor)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'supervision_request') THEN
    CREATE TABLE supervision_request (
      id bigserial PRIMARY KEY,
      student_id bigint NOT NULL,
      professor_id bigint NOT NULL,
      project_id bigint,                     -- optional: links to a published project
      status varchar(50) NOT NULL DEFAULT 'PENDING',
      message text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
    ALTER TABLE supervision_request ADD CONSTRAINT fk_request_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;
    ALTER TABLE supervision_request ADD CONSTRAINT fk_request_prof FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE;
    ALTER TABLE supervision_request ADD CONSTRAINT fk_request_project FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE SET NULL;
    CREATE INDEX IF NOT EXISTS idx_request_prof_status ON supervision_request(professor_id, status);
    CREATE INDEX IF NOT EXISTS idx_request_student ON supervision_request(student_id);
  END IF;
END $$;

-- 5) Proposals (student-submitted ideas)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'proposal') THEN
    CREATE TABLE proposal (
      id bigserial PRIMARY KEY,
      student_id bigint NOT NULL,
      title varchar(255) NOT NULL,
      description text,
      status varchar(50) NOT NULL DEFAULT 'PENDING',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
    ALTER TABLE proposal ADD CONSTRAINT fk_proposal_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_proposal_student ON proposal(student_id);
  END IF;
END $$;

-- 6) Assignments (official approved supervision)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'assignment') THEN
    CREATE TABLE assignment (
      id bigserial PRIMARY KEY,
      student_id bigint NOT NULL,
      professor_id bigint NOT NULL,
      project_id bigint NOT NULL,
      start_date date,
      end_date date,
      status varchar(50) NOT NULL DEFAULT 'ACTIVE',
      created_at timestamptz DEFAULT now()
    );
    ALTER TABLE assignment ADD CONSTRAINT fk_assignment_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;
    ALTER TABLE assignment ADD CONSTRAINT fk_assignment_prof FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE;
    ALTER TABLE assignment ADD CONSTRAINT fk_assignment_project FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE;
    -- prevent duplicate assignments for same student/project
    CREATE UNIQUE INDEX IF NOT EXISTS ux_assignment_student_project ON assignment(student_id, project_id);
    CREATE INDEX IF NOT EXISTS idx_assignment_prof ON assignment(professor_id);
  END IF;
END $$;

-- 7) Availability slots (professor available times)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'availability_slot') THEN
    CREATE TABLE availability_slot (
      id bigserial PRIMARY KEY,
      professor_id bigint NOT NULL,
      start_time timestamptz NOT NULL,
      end_time timestamptz NOT NULL,
      recurring_rule varchar(255),  -- RFC 5545 / cron-like or custom
      is_booked boolean NOT NULL DEFAULT false,
      created_at timestamptz DEFAULT now()
    );
    ALTER TABLE availability_slot ADD CONSTRAINT fk_av_slot_prof FOREIGN KEY (professor_id) REFERENCES users(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_avail_prof ON availability_slot(professor_id);
    CREATE INDEX IF NOT EXISTS idx_avail_time ON availability_slot(start_time);
  END IF;
END $$;

-- 8) Notifications (in-app)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notification') THEN
    CREATE TABLE notification (
      id bigserial PRIMARY KEY,
      user_id bigint NOT NULL,
      type varchar(100),
      payload jsonb,
      is_read boolean NOT NULL DEFAULT false,
      created_at timestamptz DEFAULT now()
    );
    ALTER TABLE notification ADD CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_notification_user ON notification(user_id);
  END IF;
END $$;

-- 9) Audit log (append-only)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_log') THEN
    CREATE TABLE audit_log (
      id bigserial PRIMARY KEY,
      actor_id bigint,
      actor_role varchar(50),
      action varchar(255) NOT NULL,
      target_table varchar(255),
      target_id bigint,
      details jsonb,
      created_at timestamptz DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_log(actor_id);
    CREATE INDEX IF NOT EXISTS idx_audit_target ON audit_log(target_table, target_id);
  END IF;
END $$;

-- 10) Outbox events (reliable event publishing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'outbox_event') THEN
    CREATE TABLE outbox_event (
      id bigserial PRIMARY KEY,
      event_type varchar(255) NOT NULL,
      payload jsonb NOT NULL,
      status varchar(50) NOT NULL DEFAULT 'PENDING',
      retries int NOT NULL DEFAULT 0,
      last_error text,
      created_at timestamptz DEFAULT now(),
      processed_at timestamptz
    );
    CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox_event(status);
    CREATE INDEX IF NOT EXISTS idx_outbox_created_at ON outbox_event(created_at);
  END IF;
END $$;

-- 11) Helper: updated_at trigger function (sets updated_at on row update)
CREATE OR REPLACE FUNCTION set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE') THEN
    NEW.updated_at = now();
    RETURN NEW;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to tables that use updated_at
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT table_name FROM information_schema.columns WHERE column_name='updated_at' AND table_schema='public'
  LOOP
    EXECUTE format('
      DO $trigger$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = %L) THEN
          CREATE TRIGGER %I BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at_column();
        END IF;
      END $trigger$;', 'trg_set_updated_at_' || t, 'trg_set_updated_at_' || t, t);
  END LOOP;
END $$;

-- 12) Optional: ensure project.tags is indexed (if not created earlier)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='project' AND column_name='tags') THEN
    -- create GIN index for tags jsonb
    CREATE INDEX IF NOT EXISTS idx_project_tags_gin ON project USING gin (tags);
  END IF;
END $$;

-- 13) Good housekeeping: vacuum analyze (optional)
-- Do not run automatically in migration; DBAs can schedule VACUUM.
