INSERT INTO
    department (name, code)
VALUES
    ('Software Engineering', '1'),('Communication Engineering', '2');


-- INSERT INTO
--     users (
--         email,
--         password_hash,
--         role,
--         full_name,
--         uni_id,
--         account_status
--     )
-- VALUES
--     (
--         'professor@exmaple.com',
--         '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO',
--         'PROFESSOR',
--         'Billie Eilish',
--         '202110076',
--         'OPEN'
--     ),(
--         'professor@exmaple2.com',
--         '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO',
--         'PROFESSOR',
--         'Billie Eilish',
--         '202110074',
--         'OPEN'
--     );
INSERT INTO users (
    email,
    password_hash,
    role,
    full_name,
    uni_id,
    account_status
) VALUES
('prof1@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Alan Turing', '202010001', 'OPEN'),
('student1@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Emma Watson', '202110077', 'OPEN'),
('prof2@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Marie Curie', '201910002', 'SUSPENDED'),
('student2@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Liam Neeson', '202110078', 'CLOSED'),
('prof3@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Neil deGrasse Tyson', '202010003', 'OPEN'),
('student3@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Olivia Rodrigo', '202110079', 'OPEN'),
('prof4@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Jane Goodall', '201910004', 'OPEN'),
('student4@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Noah Centineo', '202110080', 'SUSPENDED'),
('prof5@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Stephen Hawking', '202010005', 'CLOSED'),
('student5@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Taylor Swift', '202110081', 'OPEN'),
('prof6@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Rosalind Franklin', '201910006', 'OPEN'),
('student6@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Zendaya Coleman', '202110082', 'OPEN'),
('prof7@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Richard Feynman', '202010007', 'SUSPENDED'),
('student7@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Chris Hemsworth', '202110083', 'CLOSED'),
('prof8@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Ada Lovelace', '201910008', 'OPEN'),
('student8@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Ariana Grande', '202110084', 'OPEN'),
('prof9@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Albert Einstein', '202010009', 'OPEN'),
('student9@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Tom Holland', '202110085', 'SUSPENDED'),
('prof10@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'PROFESSOR', 'Dr. Katherine Johnson', '201910010', 'CLOSED'),
('student10@univ.edu', '$2a$10$AxFBfslyFe5F9P7gzpSjVeQ6VHdiag183zmsvCJzW97bKuJTodqgO', 'STUDENT', 'Beyoncé Knowles', '202110086', 'OPEN');


-- INSERT INTO
--     profile (
--         user_id,
--         bio,
--         department_id,
--         skills,
--         avatar_url,
--         cv_url,
--         alt_email,
--         telephonenumber
--     )
-- VALUES
--     (
--         1,
--         'Sample bio',
--         1,
--         'Java,Python,SQL',
--         'https://example.com/avatar.jpg',
--         'https://example.com/cv.pdf',
--         'alt@example.com',
--         '+1234567890'
--     ),(
--         2,
--         'Sample bio',
--         1,
--         'Java,Python,SQL',
--         'https://example.com/avatar.jpg',
--         'https://example.com/cv.pdf',
--         'alt@example.com',
--         '+1234567890'
--     );

INSERT INTO profile (
    user_id,
    bio,
    department_id,
    skills,
    avatar_url,
    alt_email,
    telephonenumber
) VALUES
(1, 'Pioneer in computer science and AI ethics. Teaches algorithms and cryptography.', 1, 'Algorithms, Cryptography, Machine Learning, C++, Python, Discrete Math', 'https://thispersondoesnotexist.com/', 'aturing@private.edu', '+12025550123'),
(2, 'Passionate about software design and open-source projects. Active in hackathons.', 1, 'Java, Spring Boot, React, Git, Docker, CI/CD, Agile', 'https://thispersondoesnotexist.com/', 'ewatson@private.edu', '+12025550124'),
(3, 'Renowned physicist and science communicator. Currently on sabbatical.', 1, 'Quantum Mechanics, Relativity, Astrophysics, MATLAB, LaTeX', 'https://thispersondoesnotexist.com/', 'mcurie@private.edu', '+12025550125'),
(4, 'Former top student, now suspended for academic misconduct. Seeking reinstatement.', 2, 'Networking, Signal Processing, Embedded Systems, C, Verilog', 'https://thispersondoesnotexist.com/', 'lneeson@private.edu', '+12025550126'),
(5, 'Astrophysicist and public science advocate. Hosts popular YouTube channel.', 1, 'Cosmology, Data Science, Python, R, SQL, Visualization', 'https://thispersondoesnotexist.com/', 'ndtyson@private.edu', '+12025550127'),
(6, 'Musician by passion, coder by day. Focused on full-stack development.', 1, 'JavaScript, Node.js, MongoDB, Express, Vue.js, REST APIs', 'https://thispersondoesnotexist.com/', 'orodrigo@private.edu', '+12025550128'),
(7, 'Primatologist and conservationist. Teaches environmental computing.', 2, 'Data Analysis, GIS, Python, R, Remote Sensing, IoT', 'https://thispersondoesnotexist.com/', 'jgoodall@private.edu', '+12025550129'),
(8, 'Actor turned tech enthusiast. Struggled with deadlines — now improving.', 2, 'C++, Arduino, PCB Design, Communication Protocols, Linux', 'https://thispersondoesnotexist.com/', 'ncentineo@private.edu', '+12025550130'),
(9, 'Theoretical physicist known for black hole research. Currently inactive.', 1, 'General Relativity, Quantum Gravity, Python, Mathematica, LaTeX', 'https://thispersondoesnotexist.com/', 'shawking@private.edu', '+12025550131'),
(10, 'Pop icon and self-taught programmer. Builds apps for music fans.', 1, 'Swift, Flutter, Firebase, UI/UX Design, API Integration, Git', 'https://thispersondoesnotexist.com/', 'tswift@private.edu', '+12025550132'),
(11, 'DNA pioneer. Teaches bioinformatics and computational biology.', 1, 'Bioinformatics, Python, R, Genomics, Data Mining, SQL', 'https://thispersondoesnotexist.com/', 'rfreanklin@private.edu', '+12025550133'),
(12, 'Actress and CS major. Balances film shoots with coding projects.', 1, 'React Native, GraphQL, AWS, TypeScript, Jest, Redux', 'https://thispersondoesnotexist.com/', 'zendaya@private.edu', '+12025550134'),
(13, 'Nobel-winning physicist. Known for playful teaching style.', 2, 'Quantum Electrodynamics, Feynman Diagrams, C++, Python, LaTeX', 'https://thispersondoesnotexist.com/', 'rfeynman@private.edu', '+12025550135'),
(14, 'Action star who failed his final project — now retaking courses.', 2, 'Network Security, Wireshark, Bash, Python, Penetration Testing', 'https://thispersondoesnotexist.com/', 'chemsworth@private.edu', '+12025550136'),
(15, 'First computer programmer. Teaches historical computing and logic.', 1, 'Assembly, Logic Design, Prolog, Haskell, Functional Programming', 'https://thispersondoesnotexist.com/', 'alovelace@private.edu', '+12025550137'),
(16, 'Singer focused on building fan engagement platforms.', 1, 'Node.js, PostgreSQL, Next.js, Stripe, OAuth, Webhooks', 'https://thispersondoesnotexist.com/', 'agrande@private.edu', '+12025550138'),
(17, 'Relativity genius. Still teaches advanced physics to undergrads.', 1, 'Tensor Calculus, Python, MATLAB, LaTeX, Special Relativity', 'https://thispersondoesnotexist.com/', 'aeinstein@private.edu', '+12025550139'),
(18, 'Spider-Man actor learning backend systems. Often late but brilliant.', 2, 'Express.js, MongoDB, Redis, Nginx, Microservices, Docker', 'https://thispersondoesnotexist.com/', 'tholland@private.edu', '+12025550140'),
(19, 'NASA mathematician. Retired but mentors students in aerospace computing.', 2, 'Orbital Mechanics, Fortran, Python, Excel VBA, Simulation', 'https://thispersondoesnotexist.com/', 'kjohnson@private.edu', '+12025550141'),
(20, 'Global superstar building AI tools for creative industries.', 1, 'Python, TensorFlow, PyTorch, GANs, Audio Processing, Unity', 'https://thispersondoesnotexist.com/', 'bbeyonce@private.edu', '+12025550142');




-- INSERT INTO
--     project (
--         id,
--         professor_id,
--         proposal_id,
--         title,
--         status,
--         updated_at,
--         short_description,
--         description,
--         requirements,
--         tags,
--         created_at
--     )
-- VALUES
--     (
--         2,
--         1,
--         2,
--         'Introduction to Quantum Mechanics',
--         'ASSIGNED',
--         '2025-12-22 10:30:00',
--         'Basics of quantum theory',
--         'This course covers wave functions, Schrödinger equation, and quantum states.',
--         '["requirment1", "requirment2", "requirment3"]',
--         '["quantum", "physics", "undergrad"]',
--         '2025-12-20 14:20:00'
--     ),
--     (
--         1,
--         2,
--         1,
--         'Introduction to Quantum Mechanics',
--         'ASSIGNED',
--         '2025-12-22 10:30:00',
--         'Basics of quantum theory',
--         'This course covers wave functions, Schrödinger equation, and quantum states.',
--         '["requirment1", "requirment2", "requirment3"]',
--         '["quantum", "physics", "undergrad"]',
--         '2025-12-20 14:20:00'
--     );

INSERT INTO project (id, professor_id, proposal_id, title, status, updated_at, short_description, description, requirements, tags, created_at) VALUES
(1, 1, NULL, 'Optimizing Cryptographic Algorithms with Machine Learning', 'OPEN', NOW(), 'Apply ML to improve crypto performance.', 'Research and implement machine learning models to optimize existing cryptographic algorithms for speed and security.', '["Python", "C++", "Machine Learning", "Cryptography"]', '["algorithms", "cryptanalysis", "undergrad"]', NOW()),
(2, 1, NULL, 'Discrete Math Foundations for Algorithm Design', 'ASSIGNED', NOW(), 'Study discrete structures for algorithm development.', 'Explore graph theory, combinatorics, and number theory to design efficient algorithms.', '["Discrete Math", "C++", "Algorithms"]', '["math", "theory", "grad"]', NOW()),
(3, 2, NULL, 'Full-Stack Web App with Spring Boot & React', 'OPEN', NOW(), 'Build scalable web app using modern stack.', 'Develop a RESTful backend with Spring Boot and dynamic frontend with React.', '["Java", "Spring Boot", "React", "Docker"]', '["web", "backend", "fullstack"]', NOW()),
(4, 2, NULL, 'CI/CD Pipeline for Microservices Architecture', 'CLOSED', NOW(), 'Automate deployment for distributed systems.', 'Design and implement CI/CD pipelines using Git, Docker, and cloud tools.', '["Git", "Docker", "CI/CD", "Agile"]', '["devops", "automation", "enterprise"]', NOW()),
(5, 3, NULL, 'Simulating Black Hole Accretion Disks in MATLAB', 'OPEN', NOW(), 'Model astrophysical phenomena numerically.', 'Implement numerical simulations of accretion disks around black holes using MATLAB.', '["MATLAB", "Astrophysics", "Relativity"]', '["quantum", "physics", "simulation"]', NOW()),
(6, 3, NULL, 'LaTeX Template for Theoretical Physics Papers', 'ASSIGNED', NOW(), 'Create standardized template for publications.', 'Design a customizable LaTeX class for formatting theoretical physics manuscripts.', '["LaTeX", "Quantum Mechanics", "Relativity"]', '["academic", "writing", "grad"]', NOW()),
(7, 4, NULL, 'Real-Time Signal Processing on Embedded Systems', 'OPEN', NOW(), 'Process sensor data on microcontrollers.', 'Implement DSP algorithms on ARM-based embedded platforms using C and Verilog.', '["C", "Verilog", "Signal Processing", "Embedded Systems"]', '["hardware", "realtime", "undergrad"]', NOW()),
(8, 4, NULL, 'Network Protocol Analyzer with FPGA', 'CLOSED', NOW(), 'Build hardware-accelerated network sniffer.', 'Design FPGA logic to capture and analyze network packets at line rate.', '["Networking", "Verilog", "C", "Embedded Systems"]', '["networking", "fpga", "security"]', NOW()),
(9, 5, NULL, 'Cosmological Data Visualization with Python', 'OPEN', NOW(), 'Visualize large-scale structure of the universe.', 'Use Python libraries to render 3D maps of galaxy distributions from survey data.', '["Python", "R", "Data Science", "Visualization"]', '["cosmology", "data", "visualization"]', NOW()),
(10, 5, NULL, 'Statistical Analysis of Cosmic Microwave Background', 'ASSIGNED', NOW(), 'Apply statistical methods to CMB datasets.', 'Perform hypothesis testing and parameter estimation on Planck satellite data.', '["R", "SQL", "Cosmology", "Data Science"]', '["statistics", "astrophysics", "grad"]', NOW()),
(11, 6, NULL, 'REST API for Real-Time Chat Application', 'OPEN', NOW(), 'Build scalable chat backend with Node.js.', 'Implement WebSocket-based messaging system using Express and MongoDB.', '["Node.js", "MongoDB", "Express", "REST APIs"]', '["web", "api", "realtime"]', NOW()),
(12, 6, NULL, 'Vue.js Dashboard for IoT Sensor Networks', 'CLOSED', NOW(), 'Create monitoring UI for connected devices.', 'Develop responsive dashboard displaying live sensor metrics using Vue.js.', '["Vue.js", "JavaScript", "REST APIs", "MongoDB"]', '["iot", "frontend", "dashboard"]', NOW()),
(13, 7, NULL, 'GIS-Based Environmental Monitoring System', 'OPEN', NOW(), 'Integrate remote sensing with spatial analysis.', 'Build platform to process satellite imagery and generate environmental risk maps.', '["Python", "R", "GIS", "Remote Sensing"]', '["gis", "environment", "data"]', NOW()),
(14, 7, NULL, 'IoT Edge Analytics with Raspberry Pi', 'ASSIGNED', NOW(), 'Deploy ML models on edge devices.', 'Run lightweight inference pipelines on Raspberry Pi using TensorFlow Lite.', '["Python", "IoT", "Data Analysis", "Remote Sensing"]', '["edge", "ml", "hardware"]', NOW()),
(15, 8, NULL, 'Arduino-Based Wireless Sensor Network', 'OPEN', NOW(), 'Design low-power mesh network for telemetry.', 'Implement communication protocols and PCB layout for battery-powered nodes.', '["C++", "Arduino", "PCB Design", "Communication Protocols"]', '["embedded", "wireless", "undergrad"]', NOW()),
(16, 8, NULL, 'Linux Kernel Module for Custom Hardware', 'CLOSED', NOW(), 'Write driver for proprietary sensor interface.', 'Develop kernel-space code to handle I/O with custom peripherals.', '["Linux", "C++", "PCB Design", "Communication Protocols"]', '["kernel", "driver", "lowlevel"]', NOW()),
(17, 9, NULL, 'Numerical Solutions to Einstein Field Equations', 'OPEN', NOW(), 'Solve GR equations via finite difference methods.', 'Implement solver in Python/Mathematica for static spacetime metrics.', '["Python", "Mathematica", "General Relativity", "Quantum Gravity"]', '["relativity", "numerical", "grad"]', NOW()),
(18, 9, NULL, 'Feynman Diagram Generator for QFT', 'ASSIGNED', NOW(), 'Automate diagram rendering for perturbation theory.', 'Build tool to draw and calculate amplitudes for particle interactions.', '["LaTeX", "Python", "Quantum Gravity", "General Relativity"]', '["qft", "diagrams", "research"]', NOW()),
(19, 10, NULL, 'Cross-Platform Mobile App with Flutter & Firebase', 'OPEN', NOW(), 'Build iOS/Android app with real-time sync.', 'Develop feature-rich mobile application using Flutter and Firebase backend.', '["Flutter", "Firebase", "Swift", "UI/UX Design"]', '["mobile", "crossplatform", "app"]', NOW()),
(20, 10, NULL, 'API Integration for E-commerce Checkout', 'CLOSED', NOW(), 'Connect payment gateways and inventory systems.', 'Implement secure API calls to Stripe and third-party services.', '["API Integration", "Git", "Swift", "Firebase"]', '["ecommerce", "payments", "backend"]', NOW()),
(21, 11, NULL, 'Genomic Variant Calling Pipeline in Python', 'OPEN', NOW(), 'Process NGS data to identify mutations.', 'Build scalable pipeline for aligning reads and calling SNPs/indels.', '["Python", "R", "Bioinformatics", "Genomics"]', '["genomics", "bio", "data"]', NOW()),
(22, 11, NULL, 'Machine Learning for Drug Target Prediction', 'ASSIGNED', NOW(), 'Predict protein-drug interactions using ML.', 'Train classifiers on structural and sequence features of proteins.', '["Data Mining", "SQL", "Python", "R"]', '["ml", "pharma", "research"]', NOW()),
(23, 12, NULL, 'GraphQL API for Social Media Platform', 'OPEN', NOW(), 'Replace REST with GraphQL for flexible queries.', 'Implement schema, resolvers, and authentication using Apollo Server.', '["GraphQL", "AWS", "TypeScript", "React Native"]', '["api", "graphql", "social"]', NOW()),
(24, 12, NULL, 'Unit Testing React Native Components with Jest', 'CLOSED', NOW(), 'Ensure UI reliability through automated tests.', 'Write snapshot and integration tests for mobile components.', '["Jest", "Redux", "React Native", "TypeScript"]', '["testing", "mobile", "frontend"]', NOW()),
(25, 13, NULL, 'Quantum Electrodynamics Simulations in C++', 'OPEN', NOW(), 'Compute scattering amplitudes using Feynman rules.', 'Implement numerical evaluation of loop diagrams and renormalization.', '["C++", "Python", "Quantum Electrodynamics", "Feynman Diagrams"]', '["qed", "simulation", "grad"]', NOW()),
(26, 13, NULL, 'LaTeX Package for Drawing Feynman Diagrams', 'ASSIGNED', NOW(), 'Extend TikZ for automatic diagram generation.', 'Create macros to render complex QED processes with minimal input.', '["LaTeX", "Python", "C++", "Feynman Diagrams"]', '["latex", "graphics", "research"]', NOW()),
(27, 14, NULL, 'Penetration Testing Lab with Wireshark', 'OPEN', NOW(), 'Set up controlled environment for ethical hacking.', 'Configure vulnerable VMs and capture traffic for analysis.', '["Wireshark", "Bash", "Python", "Penetration Testing"]', '["security", "hacking", "lab"]', NOW()),
(28, 14, NULL, 'Automated Network Vulnerability Scanner', 'CLOSED', NOW(), 'Scan networks for open ports and misconfigurations.', 'Develop script to fingerprint services and report risks.', '["Python", "Network Security", "Bash", "Wireshark"]', '["automation", "security", "scripting"]', NOW()),
(29, 15, NULL, 'Prolog Interpreter in Haskell', 'OPEN', NOW(), 'Implement logic programming language from scratch.', 'Parse and evaluate Prolog programs using functional paradigms.', '["Haskell", "Prolog", "Functional Programming", "Assembly"]', '["language", "compiler", "theory"]', NOW()),
(30, 15, NULL, 'Logic Circuit Simulator with Verilog Backend', 'ASSIGNED', NOW(), 'Model digital circuits and verify timing.', 'Translate high-level descriptions into Verilog testbenches.', '["Logic Design", "Assembly", "Prolog", "Functional Programming"]', '["digital", "verilog", "simulation"]', NOW()),
(31, 16, NULL, 'E-commerce Backend with Next.js & PostgreSQL', 'OPEN', NOW(), 'Build scalable order management system.', 'Implement cart, checkout, and inventory modules with PostgreSQL.', '["PostgreSQL", "Next.js", "Stripe", "OAuth"]', '["ecommerce", "backend", "fullstack"]', NOW()),
(32, 16, NULL, 'Webhook Integration for Third-Party Services', 'CLOSED', NOW(), 'Enable event-driven updates from external APIs.', 'Handle incoming payloads and trigger actions based on business rules.', '["Webhooks", "Node.js", "OAuth", "Stripe"]', '["integration", "events", "api"]', NOW()),
(33, 17, NULL, 'Tensor Calculus for General Relativity in Python', 'OPEN', NOW(), 'Compute curvature tensors and geodesics.', 'Implement symbolic differentiation and tensor operations.', '["Python", "MATLAB", "Tensor Calculus", "Special Relativity"]', '["gr", "math", "symbolic"]', NOW()),
(34, 17, NULL, 'MATLAB GUI for Relativistic Kinematics', 'ASSIGNED', NOW(), 'Visualize time dilation and length contraction.', 'Build interactive tool to simulate relativistic motion effects.', '["MATLAB", "LaTeX", "Special Relativity", "Tensor Calculus"]', '["gui", "simulation", "education"]', NOW()),
(35, 18, NULL, 'Microservices Architecture with Redis & Nginx', 'OPEN', NOW(), 'Decouple monolith into independent services.', 'Implement service discovery, caching, and load balancing.', '["Redis", "Nginx", "Microservices", "Docker"]', '["architecture", "cloud", "scalable"]', NOW()),
(36, 18, NULL, 'Real-Time Analytics Dashboard with Express & MongoDB', 'CLOSED', NOW(), 'Display live metrics from distributed systems.', 'Aggregate logs and serve charts via REST endpoints.', '["Express.js", "MongoDB", "Redis", "Nginx"]', '["analytics", "dashboard", "realtime"]', NOW()),
(37, 19, NULL, 'Orbital Trajectory Simulator in Fortran', 'OPEN', NOW(), 'Model spacecraft trajectories under gravity.', 'Solve ODEs for two-body and patched-conic problems.', '["Fortran", "Python", "Orbital Mechanics", "Simulation"]', '["space", "simulation", "numerical"]', NOW()),
(38, 19, NULL, 'Excel VBA Tool for Mission Planning', 'ASSIGNED', NOW(), 'Automate calculation of delta-v and transfer windows.', 'Build spreadsheet add-in for rapid mission analysis.', '["Excel VBA", "Python", "Orbital Mechanics", "Fortran"]', '["excel", "automation", "engineering"]', NOW()),
(39, 20, NULL, 'Audio Classification with GANs in PyTorch', 'OPEN', NOW(), 'Generate synthetic audio for training classifiers.', 'Train GAN to augment dataset for speech/music recognition.', '["PyTorch", "GANs", "Audio Processing", "TensorFlow"]', '["audio", "gan", "deeplearning"]', NOW()),
(40, 20, NULL, 'Unity Game Engine Integration with TensorFlow Lite', 'CLOSED', NOW(), 'Deploy ML models in real-time game environments.', 'Embed object detection or gesture recognition in Unity scenes.', '["Unity", "TensorFlow", "Python", "Audio Processing"]', '["game", "ml", "realtime"]', NOW());



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
