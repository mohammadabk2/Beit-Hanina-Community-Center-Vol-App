CREATE TABLE person
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    email TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    insurance VARCHAR(50),
    idNumber VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(50) UNIQUE,
    passwordHash VARCHAR(255)
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE person_role (
    person_id INT REFERENCES person(id) ON DELETE CASCADE,
    role_id INT REFERENCES role(id) ON DELETE CASCADE,
    PRIMARY KEY (person_id, role_id)
);

CREATE TABLE volunteer (
    person_id INT PRIMARY KEY REFERENCES person(id) ON DELETE CASCADE,
    total_hours INT DEFAULT 0,
    tags TEXT[]
);

CREATE TABLE organizer (
    person_id INT PRIMARY KEY REFERENCES person(id) ON DELETE CASCADE,
    org_name VARCHAR(100) NOT NULL,
    tags TEXT[]
);

-- predefine the Roles
INSERT INTO role (name) VALUES ('ADMIN'), ('VOLUNTEER'), ('ORGANIZER');

-- example
-- INSERT INTO person (name, birth_date, sex, address, phone_number, id_number, insurance, username, password)
-- VALUES ('John Doe', '1990-01-01', 'M', '123 Main St', '123-456-7890', 'ID12345', 'Health Insurance', 'johndoe', 'password123');

-- Assign roles to the inserted person
-- INSERT INTO person_role (person_id, role_id)
-- SELECT id, (SELECT id FROM role WHERE name = 'ADMIN') FROM inserted_person;
-- INSERT INTO person_role (person_id, role_id)
-- SELECT id, (SELECT id FROM role WHERE name = 'ORGANIZER') FROM inserted_person;