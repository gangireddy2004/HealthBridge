USE healthbridge_db;

-- View all users
SELECT * FROM users;

-- View only admins
SELECT * FROM users
WHERE role='ROLE_ADMIN';

-- View doctors
SELECT * FROM users
WHERE role='ROLE_DOCTOR';

-- View patients
SELECT * FROM users
WHERE role='ROLE_PATIENT';

-- Count users
SELECT COUNT(*) AS total_users
FROM users;

-- Search by email
SELECT *
FROM users
WHERE email='admin@healthbridge.com';