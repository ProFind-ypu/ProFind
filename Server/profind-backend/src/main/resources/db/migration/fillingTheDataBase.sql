INSERT INTO
    department (name, code)
VALUES
    ('Software', '101');

INSERT INTO
    project (
        id,
        professor_id,
        title,
        status,
        updated_at,
        short_description,
        description,
        requirements,
        tags,
        created_at
    )
VALUES
    (
        2,
        1,
        'Introduction to Quantum Mechanics',
        'ASSIGNED',
        '2025-12-22 10:30:00',
        'Basics of quantum theory',
        'This course covers wave functions, Schrödinger equation, and quantum states.',
        '["requirment1", "requirment2", "requirment3"]',
        '["quantum", "physics", "undergrad"]',
        '2025-12-20 14:20:00'
    );

INSERT INTO
    project (
        id,
        professor_id,
        title,
        status,
        updated_at,
        short_description,
        description,
        requirements,
        tags,
        created_at
    )
VALUES
    (
        1,
        2,
        'Introduction to Quantum Mechanics',
        'ASSIGNED',
        '2025-12-22 10:30:00',
        'Basics of quantum theory',
        'This course covers wave functions, Schrödinger equation, and quantum states.',
        '["requirment1", "requirment2", "requirment3"]',
        '["quantum", "physics", "undergrad"]',
        '2025-12-20 14:20:00'
    );

INSERT INTO
    profile (
        user_id,
        bio,
        department_id,
        year,
        skills,
        avatar_url,
        cv_url,
        alt_email,
        telephonenumber
    )
VALUES
    (
        1,
        'Sample bio',
        1,
        2025,
        'Java,Python,SQL',
        'https://example.com/avatar.jpg',
        'https://example.com/cv.pdf',
        'alt@example.com',
        '+1234567890'
    );

INSERT INTO
    profile (
        user_id,
        bio,
        department_id,
        year,
        skills,
        avatar_url,
        cv_url,
        alt_email,
        telephonenumber
    )
VALUES
    (
        2,
        'Sample bio',
        1,
        2025,
        'Java,Python,SQL',
        'https://example.com/avatar.jpg',
        'https://example.com/cv.pdf',
        'alt@example.com',
        '+1234567890'
    );

INSERT INTO
    users (
        email,
        password_hash,
        role,
        full_name,
        uni_id,
        account_status)VALUES('professor@exmaple.com','$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97
bKuJTodqgO','PROFESSOR','Billie Eilish','202110076','OPEN');

INSERT INTO
    users (
        email,
        password_hash,
        role,
        full_name,
        uni_id,
        account_status)VALUES('professor@exmaple2.com','$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97
bKuJTodqgO','PROFESSOR','Billie Eilish','202110076','OPEN');
