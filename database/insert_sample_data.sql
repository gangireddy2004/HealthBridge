USE healthbridge_db;

INSERT INTO users
(email,password,role,first_name,last_name)
VALUES

(
'admin@healthbridge.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoOHiA4m7K8u6JQm6Y7WwP7O9dY7V2sKKa',
'ROLE_ADMIN',
'System',
'Administrator'
),

(
'doctor1@healthbridge.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoOHiA4m7K8u6JQm6Y7WwP7O9dY7V2sKKa',
'ROLE_DOCTOR',
'Ravi',
'Kumar'
),

(
'patient1@healthbridge.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoOHiA4m7K8u6JQm6Y7WwP7O9dY7V2sKKa',
'ROLE_PATIENT',
'Anita',
'Sharma'
);