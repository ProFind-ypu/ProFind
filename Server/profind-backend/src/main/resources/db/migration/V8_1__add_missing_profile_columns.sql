DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'profile'
  ) THEN
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_name = 'profile' AND column_name = 'alt_email'
    ) THEN
      ALTER TABLE profile ADD COLUMN alt_email varchar(1024);
    END IF;

    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_name = 'profile' AND column_name = 'telephonenumber'
    ) THEN
      ALTER TABLE profile ADD COLUMN telephonenumber varchar(1024);
    END IF;
  END IF;
END $$;
