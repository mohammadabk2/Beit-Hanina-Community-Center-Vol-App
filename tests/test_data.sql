-- Insert into users table
-- Assuming IDs will be 1, 2, 3, 4
INSERT INTO users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, role) VALUES
('Alice Wonderland', '1995-03-15', 'F', '555-1234', 'alice.w@example.com', '123 Rabbit Hole Lane', 'WonderCare', 'IDALICE001', 'alicew', 'hash_alice_pw', ARRAY['Logged in 2024-01-10', 'Updated profile 2024-01-11'], ARRAY['volunteer']),
('Bob The Builder', '1988-07-20', 'M', '555-5678', 'bob.b@example.com', '456 Construction Ave', 'BuildWell', 'IDBOB002', 'bobtheb', 'hash_bob_pw', ARRAY['Logged in 2024-01-09'], ARRAY['organizer']),
('Charlie Chaplin', '1992-11-01', 'M', '555-9101', 'charlie.c@example.com', '789 Silent Film St', 'BuildWell', 'IDCHARLIE003', 'charliec', 'hash_charlie_pw', ARRAY['Logged in 2024-01-12'], ARRAY['volunteer']),
('Diana Prince', '1985-05-25', 'F', '555-1121', 'diana.p@example.com', '1 Amazon Circle', 'Justice Insure', 'IDDIANA004', 'dianap', 'hash_diana_pw', ARRAY['Logged in 2024-01-11', 'Created event 2024-01-12'], ARRAY['organizer', 'admin']);

-- Insert into users_waiting_list table
-- Assuming IDs will be 1, 2
INSERT INTO users_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, role) VALUES
('Eve Pending', '2000-01-01', 'F', '555-2233', 'eve.p@example.com', '10 Waiting Way', 'FutureCare', 'IDEVE005', 'evep', 'hash_eve_pw', ARRAY[]::TEXT[], ARRAY['volunteer']),
('Frank Waiting', '1998-09-10', 'M', '555-4455', 'frank.w@example.com', '11 Approval Ave', 'FutureCare', 'IDFRANK006', 'frankw', 'hash_frank_pw', ARRAY[]::TEXT[], ARRAY['volunteer']);

-- Insert into organizer table
-- Reference user IDs from the users table (Bob=2, Diana=4)
INSERT INTO organizer (user_id, org_name, given_hours, vol_id) VALUES
(2, 'City Fixers', 150, ARRAY[1, 3]), -- Bob organizes Alice (1) and Charlie (3)
(4, 'Community Heroes', 200, ARRAY[1]);     -- Diana organizes Alice (1)

-- Insert into volunteer table
-- Reference user IDs from the users table (Alice=1, Charlie=3)
INSERT INTO volunteer (user_id, approved_hours, unapproved_hours, orgs) VALUES
(1, 50, 10, ARRAY['City Fixers', 'Community Heroes']), -- Alice volunteers for Bob and Diana
(3, 25, 5, ARRAY['City Fixers']); -- Charlie volunteers for Bob

-- Insert into events table
-- Assuming event_ids will be 1, 2, 3
-- Reference organizer user IDs (Bob=2, Diana=4)
-- Reference volunteer user IDs (Alice=1, Charlie=3)
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol) VALUES
('Park Cleanup Day', CURRENT_DATE + INTERVAL '7 day', '09:00:00', '12:00:00', TRUE, 2, ARRAY[1, 3], ARRAY[]::INT[], 20, 2), -- Organized by Bob (2), Alice (1) and Charlie (3) attending
('Soup Kitchen Service', CURRENT_DATE + INTERVAL '14 day', '17:00:00', '19:00:00', TRUE, 4, ARRAY[1], ARRAY[]::INT[], 10, 1), -- Organized by Diana (4), Alice (1) attending
('Community Garden Setup', CURRENT_DATE - INTERVAL '30 day', '10:00:00', '15:00:00', FALSE, 2, ARRAY[1], ARRAY[]::INT[], 15, 1); -- Past event by Bob (2), Alice (1) attended

-- Insert into events_status table
-- This assumes event IDs 1, 2, 3 were generated above.
-- Distribute these IDs into the status arrays.
-- This is a single row containing all statuses.
INSERT INTO events_status (approved, rejected, pending, ongoing, finished) VALUES
(ARRAY[1, 2], ARRAY[]::INT[], ARRAY[]::INT[], ARRAY[]::INT[], ARRAY[3]);