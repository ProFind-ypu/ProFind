INSERT INTO
    department (name, code)
VALUES
    ('Software Engineering', '101');

INSERT INTO
    users (
        email,
        password_hash,
        role,
        full_name,
        uni_id,
        account_status
    )
VALUES
    (
        'professor@exmaple.com',
        '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO',
        'PROFESSOR',
        'Billie Eilish',
        '202110076',
        'OPEN'
    ),(
        'professor@exmaple2.com',
        '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO',
        'PROFESSOR',
        'Billie Eilish',
        '202110074',
        'OPEN'
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
    ),(
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
    project (
        id,
        professor_id,
        proposal_id,
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
        2,
        'Introduction to Quantum Mechanics',
        'ASSIGNED',
        '2025-12-22 10:30:00',
        'Basics of quantum theory',
        'This course covers wave functions, Schrödinger equation, and quantum states.',
        '["requirment1", "requirment2", "requirment3"]',
        '["quantum", "physics", "undergrad"]',
        '2025-12-20 14:20:00'
    ),
    (
        1,
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
    proposal (
        student_id,
        professor_id,
        project_id,
        title,
        description,
        status,
        message,
        form_data,
        created_at,
        updated_at
    )
VALUES
    (1, 1, 1, 'hallowTitle','LongDescription','PENDING', 'hallowWorld', '{"projectType": 1,"arabicTitle": "عنوان المشروع بالعربية","englishTitle": "Project Title in English","scientificField": [3, 7, 12],"targetEntities": "Universities and Research Centers","projectDescription": "A detailed description of the project scope and objectives.","expectedOutcomes": "Published papers, prototype development, and trained students.","requiredSkillsTools": "Python, React, TensorFlow, Git","acquiredSkills": "Machine Learning, Web Development, Team Collaboration","supervisors": ["Dr. Ahmed", "Prof. Sarah"],"studentsnumber": 5,"students": [  { "name": "Alice", "uni_id": "202110076" },  { "name": "Charlie", "uni_id": "2152364" }]}', NOW (), NOW ());