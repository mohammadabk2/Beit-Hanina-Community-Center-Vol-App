CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(30) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    banned BOOLEAN DEFAULT FALSE,
    role TEXT,
    profile_image_url TEXT,
    fav_events INT[] DEFAULT '{}',
    signed_up_events INT[] DEFAULT '{}',
    logs TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS volunteer
(
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    insurance TEXT NOT NULL,
    id_number VARCHAR(20) NOT NULL UNIQUE,
    approved_hours INT DEFAULT 0,
    unapproved_hours INT DEFAULT 0,
    skills TEXT[] DEFAULT '{}',
    orgs INT[] DEFAULT '{}',
    fav_events INT[] DEFAULT '{}',
    signed_up_events INT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS volunteer_waiting_list
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    phone_number VARCHAR(30) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    insurance TEXT NOT NULL,
    occupation VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) NOT NULL UNIQUE,
    username TEXT UNIQUE,
    password_hash VARCHAR(255),
    skills TEXT[] DEFAULT '{}',
    profile_image_url TEXT
);

CREATE TABLE IF NOT EXISTS rejected_users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    phone_number VARCHAR(30) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    insurance TEXT NOT NULL,
    id_number VARCHAR(20) NOT NULL UNIQUE,
    username TEXT UNIQUE,
    password_hash VARCHAR(255),
    profile_image_url TEXT
);

-- New system_logs table for proper logging
CREATE TABLE IF NOT EXISTS system_logs
(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_level VARCHAR(10) DEFAULT 'INFO' CHECK (log_level IN ('DEBUG', 'INFO', 'WARN', 'ERROR'))
);

-- Indexes for fast log queries
CREATE INDEX IF NOT EXISTS idx_system_logs_user_id ON system_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_logs_action ON system_logs(action);
CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(log_level);

CREATE TABLE IF NOT EXISTS organizer
(
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    org_name VARCHAR(100) NOT NULL,
    given_hours INT DEFAULT 0,/*Ask Fadi*/
    vol_id INT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS events
(
    event_id SERIAL PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_start TIME NOT NULL,
    event_end TIME NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    org_id INT REFERENCES organizer(user_id) ON DELETE SET NULL,
    vol_id INT[] DEFAULT '{}',
    vol_id_waiting_list INT[] DEFAULT '{}',
    max_number_of_vol INT,
    current_number_of_vol INT DEFAULT 0,
    event_location TEXT NOT NULL,
    event_description TEXT DEFAULT '',
    event_skills TEXT [] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS events_status
(
    approved INT[] DEFAULT '{}',
    rejected INT[] DEFAULT '{}', /*Check if Fadi wants this*/
    pending INT[] DEFAULT '{}',
    ongoing INT[] DEFAULT '{}',
    finished INT[] DEFAULT '{}'
);

-- ? maybe add more indexs or change
-- Indexes for frequently searched fields
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE INDEX idx_users_phone_number ON users(phone_number);
-- CREATE INDEX idx_events_event_date ON events(event_date);

-- -- Indexes for id and id_number columns
-- CREATE INDEX idx_users_id_number ON users(id_number);
-- CREATE INDEX idx_users_waiting_list_id_number ON users_waiting_list(id_number);
-- CREATE INDEX idx_users_id ON users(id);
-- CREATE INDEX idx_users_waiting_list_id ON users_waiting_list(id);

-- predefine the Roles
-- INSERT INTO role (name) VALUES ('ADMIN'), ('VOLUNTEER'), ('ORGANIZER');

-- example
-- INSERT INTO users (name, birth_date, sex, address, phone_number, id_number, insurance, username, password_hash)
-- VALUES ('John Doe', '1990-01-01', 'M', '123 Main St', '123-456-7890', 'ID12345', 'Health Insurance', 'johndoe', 'password123');

-- Assign roles to the inserted user
-- INSERT INTO user_role (user_id, role_id)
-- SELECT id, (SELECT id FROM role WHERE name = 'ADMIN') FROM inserted_user;
-- INSERT INTO user_role (user_id, role_id)
-- SELECT id, (SELECT id FROM role WHERE name = 'ORGANIZER') FROM inserted_user;

-- CREATE TABLE IF NOT EXISTS role (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL UNIQUE
-- );

-- CREATE TABLE IF NOT EXISTS user_role (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     role_id INT REFERENCES role(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, role_id)
-- );
