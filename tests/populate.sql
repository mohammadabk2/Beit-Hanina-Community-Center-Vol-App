-- USERS
INSERT INTO users (phone_number, email, address, username, password_hash, banned, logs, role, profile_image_url)
VALUES
('111-111-1111', 'admin1@example.com', '1 Admin St', 'admin1', 'hash1', FALSE, ARRAY['created account', 'updated profile'], 'ADMIN', 'https://img.com/1.jpg'),
('222-222-2222', 'vol1@example.com', '2 Vol St', 'vol1', 'hash2', FALSE, ARRAY['joined event'], 'VOLUNTEER', 'https://img.com/2.jpg'),
('333-333-3333', 'org1@example.com', '3 Org St', 'org1', 'hash3', FALSE, ARRAY['created org'], 'ORGANIZER', 'https://img.com/3.jpg'),
('444-444-4444', 'vol2@example.com', '4 Vol St', 'vol2', 'hash4', TRUE, ARRAY['banned'], 'VOLUNTEER', 'https://img.com/4.jpg'),
('555-555-5555', 'vol3@example.com', '5 Vol St', 'vol3', 'hash5', FALSE, ARRAY[]::text[], 'VOLUNTEER', 'https://img.com/5.jpg'),
('666-666-6666', 'org2@example.com', '6 Org St', 'org2', 'hash6', FALSE, ARRAY['created org'], 'ORGANIZER', 'https://img.com/6.jpg'),
('777-777-7777', 'admin2@example.com', '7 Admin St', 'admin2', 'hash7', FALSE, ARRAY['reset password'], 'ADMIN', 'https://img.com/7.jpg');

-- VOLUNTEER
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, skills, orgs)
VALUES
(2, 'Alice Blue', '2000-01-01', 'F', 'SafeInsure', 'V1001', 10, 2, ARRAY['First Aid', 'Cooking'], ARRAY[1]::int[]),
(4, 'Bob Green', '1999-02-02', 'M', 'LifeCare', 'V1002', 5, 1, ARRAY['Driving'], ARRAY[1,2]::int[]),
(5, 'Carol Red', '2001-03-03', 'F', 'MediPlus', 'V1003', 0, 0, ARRAY[]::text[], ARRAY[]::int[]);

-- ORGANIZER
INSERT INTO organizer (user_id, org_name, given_hours, vol_id)
VALUES
(3, 'Helping Hands', 20, ARRAY[2,4]::int[]),
(6, 'Green Peace', 30, ARRAY[5]::int[]);

-- EVENTS
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description, event_skills)
VALUES
('Food Drive', '2024-07-01', '09:00', '13:00', TRUE, 3, ARRAY[2,4]::int[], ARRAY[5]::int[], 10, 2, 'Community Center', 'Distribute food', ARRAY['Organization', 'Teamwork']),
('Park Cleanup', '2024-07-10', '10:00', '14:00', TRUE, 3, ARRAY[4]::int[], ARRAY[]::int[], 8, 1, 'Central Park', 'Clean up park', ARRAY['Cleaning', 'Teamwork']),
('Tree Planting', '2024-09-15', '09:30', '13:30', FALSE, 6, ARRAY[5]::int[], ARRAY[2]::int[], 20, 1, 'City Park', 'Planting trees', ARRAY['Gardening', 'Teamwork']);

-- VOLUNTEER WAITING LIST
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, occupation, id_number, username, password_hash, logs, skills, profile_image_url)
VALUES
('Daisy White', '2002-04-04', 'F', '888-888-8888', 'wait1@example.com', '8 Wait St', 'SafeInsure', 'Student', 'WV1001', 'waituser1', 'hash8', ARRAY['applied'], ARRAY['Cooking'], 'https://img.com/8.jpg'),
('Evan Black', '2003-05-05', 'M', '999-999-9999', 'wait2@example.com', '9 Wait St', 'LifeCare', 'Unemployed', 'WV1002', 'waituser2', 'hash9', ARRAY[]::text[], ARRAY[]::text[], 'https://img.com/9.jpg');

-- REJECTED USERS
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, profile_image_url)
VALUES
('Fay Brown', '1998-06-06', 'F', '101-101-1010', 'rej1@example.com', '10 Rej St', 'MediPlus', 'RV1001', 'rejuser1', 'hash10', ARRAY['rejected'], 'https://img.com/10.jpg'),
('George Gray', '1997-07-07', 'M', '202-202-2020', 'rej2@example.com', '11 Rej St', 'SafeInsure', 'RV1002', 'rejuser2', 'hash11', ARRAY[]::text[], 'https://img.com/11.jpg');

-- EVENTS STATUS
INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
VALUES
(ARRAY[1,2]::int[], ARRAY[3]::int[], ARRAY[2]::int[], ARRAY[]::int[], ARRAY[1]::int[]);
