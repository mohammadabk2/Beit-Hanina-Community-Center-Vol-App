-- USERS
INSERT INTO users (phone_number, email, address, username, password_hash, banned, role, profile_image_url)
VALUES
('111-111-1111', 'admin1@example.com', '1 Admin St', 'admin1', 'pass', FALSE, 'admin', 'https://img.com/1.jpg'),
('222-222-2222', 'vol1@example.com', '2 Vol St', 'vol1', 'pass', FALSE, 'volunteer', 'https://img.com/2.jpg'),
('333-333-3333', 'org1@example.com', '3 Org St', 'org1', 'pass', FALSE, 'organizer', 'https://img.com/3.jpg'),
('444-444-4444', 'vol2@example.com', '4 Vol St', 'vol2', 'pass', TRUE, 'volunteer', 'https://img.com/4.jpg'),
('555-555-5555', 'vol3@example.com', '5 Vol St', 'vol3', 'pass', FALSE, 'volunteer', 'https://img.com/5.jpg'),
('666-666-6666', 'org2@example.com', '6 Org St', 'org2', 'pass', FALSE, 'organizer', 'https://img.com/6.jpg'),
('777-777-7777', 'admin2@example.com', '7 Admin St', 'admin2', 'pass', FALSE, 'admin', 'https://img.com/7.jpg');

-- VOLUNTEER
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, skills, orgs)
VALUES
(2, 'Alice Blue', '2000-01-01', 'F', 'SafeInsure', 'V1001', 10, 2, ARRAY['First Aid', 'Cooking'], ARRAY[1]::int[]),
(4, 'Bob Green', '1999-02-02', 'M', 'LifeCare', 'V1002', 5, 1, ARRAY['Driving'], ARRAY[1,2]::int[]),
(5, 'Carol Red', '2001-03-03', 'F', 'MediPlus', 'V1003', 3, 2, ARRAY[]::text[], ARRAY[]::int[]);

-- ORGANIZER
INSERT INTO organizer (user_id, org_name, given_hours, vol_id)
VALUES
(3, 'Helping Hands', 20, ARRAY[2,4]::int[]),
(6, 'Green Peace', 30, ARRAY[5]::int[]);

-- EVENTS
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description, event_skills)
VALUES
('Food Drive', '2024-07-01', '09:00', '13:00', TRUE, 3, ARRAY[2,4]::int[], ARRAY[2,5]::int[], 10, 2, 'Community Center', 'Distribute food to the community and help them with their daily needs', ARRAY['Organization', 'Teamwork']),
('Park Cleanup', '2024-07-10', '10:00', '14:00', TRUE, 3, ARRAY[4]::int[], ARRAY[]::int[], 8, 1, 'Central Park', 'Clean up park', ARRAY['Cleaning', 'Teamwork']),
('Tree Planting', '2024-09-15', '09:30', '13:30', FALSE, 6, ARRAY[5]::int[], ARRAY[2]::int[], 20, 1, 'City Park', 'Planting trees', ARRAY['Gardening', 'Teamwork']),
('Sample Event', '2024-12-01', '10:00', '14:00', TRUE, 3, ARRAY[2,4]::int[], ARRAY[5,2]::int[], 10, 2, 'Sample Location', 'Sample Description', ARRAY['Skill1', 'Skill2']);

-- VOLUNTEER WAITING LIST
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, occupation, id_number, username, password_hash, skills, profile_image_url)
VALUES
('Daisy White', '2002-04-04', 'F', '888-888-8888', 'wait1@example.com', '8 Wait St', 'SafeInsure', 'Student', 'WV1001', 'waituser1', 'pass', ARRAY['Cooking'], 'https://img.com/8.jpg'),
('Evan Black', '2003-05-05', 'M', '999-999-9999', 'wait2@example.com', '9 Wait St', 'LifeCare', 'Unemployed', 'WV1002', 'waituser2', 'pass', ARRAY[]::text[], 'https://img.com/9.jpg');

-- REJECTED USERS
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES
('Fay Brown', '1998-06-06', 'F', '101-101-1010', 'rej1@example.com', '10 Rej St', 'MediPlus', 'RV1001', 'rejuser1', 'pass', 'https://img.com/10.jpg'),
('George Gray', '1997-07-07', 'M', '202-202-2020', 'rej2@example.com', '11 Rej St', 'SafeInsure', 'RV1002', 'rejuser2', 'pass', 'https://img.com/11.jpg');

-- EVENTS STATUS
INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
VALUES
(ARRAY[1,2]::int[], ARRAY[]::int[], ARRAY[3,4]::int[], ARRAY[]::int[], ARRAY[1]::int[]);

-- SYSTEM LOGS (Sample data for the new logging system)
INSERT INTO system_logs (user_id, action, details, log_level, created_at)
VALUES
(1, 'USER_CREATED', 'Admin account created', 'INFO', '2024-01-01 10:00:00'),
(1, 'PROFILE_UPDATED', 'Admin profile updated', 'INFO', '2024-01-01 10:30:00'),
(2, 'USER_CREATED', 'Volunteer account created', 'INFO', '2024-01-02 09:00:00'),
(2, 'EVENT_JOINED', 'Joined Food Drive event', 'INFO', '2024-01-02 14:00:00'),
(3, 'USER_CREATED', 'Organizer account created', 'INFO', '2024-01-03 11:00:00'),
(3, 'ORG_CREATED', 'Created organization: Helping Hands', 'INFO', '2024-01-03 11:30:00'),
(4, 'USER_BANNED', 'User account was banned', 'WARN', '2024-01-04 16:00:00'),
(7, 'PASSWORD_RESET', 'Admin password was reset', 'INFO', '2024-01-05 08:00:00');
