CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    insurance VARCHAR(50),
    id_number VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    logs TEXT[],
    role TEXT[]
);

-- CREATE TABLE role (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50) NOT NULL UNIQUE
-- );

-- CREATE TABLE user_role (
--     user_id INT REFERENCES users(id) ON DELETE CASCADE,
--     role_id INT REFERENCES role(id) ON DELETE CASCADE,
--     PRIMARY KEY (user_id, role_id)
-- );

CREATE TABLE volunteer (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_hours INT DEFAULT 0,
    orgs TEXT[]
);

CREATE TABLE organizer (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    org_name VARCHAR(100) NOT NULL,
    given_hours INT DEFAULT 0,
    vol_id INT[]
);

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