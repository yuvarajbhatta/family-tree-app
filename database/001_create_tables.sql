-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer', -- 'admin', 'editor', 'viewer'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Persons table
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  dob DATE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relationships table
CREATE TABLE relationships (
  id SERIAL PRIMARY KEY,
  person_id INTEGER REFERENCES persons(id),
  related_to_id INTEGER REFERENCES persons(id),
  relation_type VARCHAR(50) NOT NULL -- e.g. 'father', 'mother', 'son', 'daughter'
);