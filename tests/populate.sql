-- fills with all non null fields
INSERT INTO users
    (name, birth_date, sex, phone_number, address, id_number, email, username, password_hash, role)
VALUES
    ('john', '2002-02-28', 'M', '0526307235', 'some street', '123456789', 'john@gmail.com', 'john123', 'pass', ARRAY
['vol']);



INSERT INTO users
    (name, birth_date, sex, phone_number, address, id_number, email, username, password_hash, role)
VALUES
    ('adam', '2005-02-28', 'M', '0121312311', 'some street 2', '987654321', 'adam@gmail.com', 'adam2', 'pass', ARRAY
['org']);


INSERT INTO users
    (name, birth_date, sex, phone_number, address, id_number, email, username, password_hash, role)
VALUES
    ('fadi', '1990-02-28', 'M', '12312312312', 'some street 2', '987654331', 'fadi@gmail.com', 'fadi', 'pass', ARRAY
['admin']);