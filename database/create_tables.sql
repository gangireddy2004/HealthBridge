-- ===========================================
-- HealthBridge Database Schema
-- ===========================================

CREATE DATABASE IF NOT EXISTS healthbridge_db;
USE healthbridge_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('ROLE_ADMIN','ROLE_DOCTOR','ROLE_PATIENT')
        NOT NULL DEFAULT 'ROLE_PATIENT',

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;