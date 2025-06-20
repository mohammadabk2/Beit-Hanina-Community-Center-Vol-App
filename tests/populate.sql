-- Populate users
INSERT INTO users (phone_number, email, address, username, password_hash, role, profile_image_url)
VALUES
('123-456-7890', 'admin@example.com', '123 Main St', 'adminuser', 'hashedpassword1', 'ADMIN', 'https://example.com/img1.jpg'),
('234-567-8901', 'vol1@example.com', '234 Oak St', 'voluser1', 'hashedpassword2', 'VOLUNTEER', 'https://example.com/img2.jpg'),
('345-678-9012', 'org1@example.com', '345 Pine St', 'orguser1', 'hashedpassword3', 'ORGANIZER', 'https://example.com/img3.jpg'),
('456-789-0123', 'vol2@example.com', '456 Maple St', 'voluser2', 'hashedpassword4', 'VOLUNTEER', 'https://example.com/img4.jpg');

-- Populate volunteer
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, orgs)
VALUES
(2, 'Alice Smith', '2000-05-15', 'F', 'HealthSafe', 'IDV1001', 10, 2, ARRAY['Red Cross']),
(4, 'Bob Johnson', '1998-11-23', 'M', 'LifeCare', 'IDV1002', 5, 1, ARRAY['Green Peace']);

-- Populate organizer
INSERT INTO organizer (user_id, org_name, given_hours, vol_id)
VALUES
(3, 'Helping Hands', 20, ARRAY[2,4]);

-- Populate events
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description, event_skills)
VALUES
('Food Drive', '2024-07-01', '09:00', '13:00', TRUE, 3, ARRAY[2], ARRAY[4], 10, 1, 'Community Center', 'Distribute food to families in need', ARRAY['Organization', 'Teamwork']),
('Park Cleanup', '2024-07-10', '10:00', '14:00', TRUE, 3, ARRAY[4], ARRAY[]::integer[], 8, 1, 'Central Park', 'Clean up park area', ARRAY['Cleaning', 'Teamwork']);

-- Populate volunteer_waiting_list
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES
('Charlie Brown', '2002-03-10', 'M', '567-890-1234', 'wait1@example.com', '789 Elm St', 'SafeLife', 'IDV2001', 'waituser1', 'hashedpassword5', 'https://example.com/img5.jpg');

-- Populate rejected_users
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES
('Dana White', '1995-08-20', 'F', '678-901-2345', 'rej1@example.com', '1010 Cedar St', 'HealthPlus', 'IDR1001', 'rejuser1', 'hashedpassword6', 'https://example.com/img6.jpg');

-- Populate events_status (single row for demo)
INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
VALUES (ARRAY[1], ARRAY[]::integer[], ARRAY[2], ARRAY[]::integer[], ARRAY[]::integer[]);

-- More users
INSERT INTO users (phone_number, email, address, username, password_hash, role, profile_image_url)
VALUES
('567-890-1234', 'vol3@example.com', '567 Birch St', 'voluser3', 'hashedpassword7', 'VOLUNTEER', 'https://example.com/img7.jpg'),
('678-901-2345', 'org2@example.com', '678 Spruce St', 'orguser2', 'hashedpassword8', 'ORGANIZER', 'https://example.com/img8.jpg'),
('789-012-3456', 'admin2@example.com', '789 Willow St', 'adminuser2', 'hashedpassword9', 'ADMIN', 'https://example.com/img9.jpg'),
('890-123-4567', 'vol4@example.com', '890 Aspen St', 'voluser4', 'hashedpassword10', 'VOLUNTEER', 'https://example.com/img10.jpg'),
('901-234-5678', 'vol5@example.com', '901 Redwood St', 'voluser5', 'hashedpassword11', 'VOLUNTEER', 'https://example.com/img11.jpg');

-- More volunteers
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, orgs)
VALUES
(5, 'Eve Adams', '2001-07-22', 'F', 'MediCare', 'IDV1003', 8, 0, ARRAY['Helping Hands']),
(6, 'Frank Lee', '1999-12-30', 'M', 'SafeLife', 'IDV1004', 12, 3, ARRAY['Green Peace', 'Helping Hands']),
(7, 'Grace Kim', '2003-02-14', 'F', 'LifeCare', 'IDV1005', 0, 0, ARRAY['Red Cross']),
(8, 'Henry Ford', '2000-09-09', 'M', 'HealthSafe', 'IDV1006', 4, 2, ARRAY['Green Peace']);

-- More organizers
INSERT INTO organizer (user_id, org_name, given_hours, vol_id)
VALUES
(6, 'Green Peace', 30, ARRAY[2,4,5,6]),
(7, 'Red Cross', 15, ARRAY[7,8]);

-- More events
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description, event_skills)
VALUES
('Blood Donation', '2024-08-05', '08:00', '12:00', TRUE, 7, ARRAY[7], ARRAY[8], 15, 1, 'Health Center', 'Blood donation event', ARRAY['Medical', 'Organization']),
('Tree Planting', '2024-09-15', '09:30', '13:30', TRUE, 6, ARRAY[5,6], ARRAY[2], 20, 2, 'City Park', 'Planting trees for the environment', ARRAY['Gardening', 'Teamwork']),
('Book Drive', '2024-10-01', '10:00', '16:00', FALSE, 3, ARRAY[2,4,5], ARRAY[6,7], 25, 3, 'Library', 'Collecting books for children', ARRAY['Organization', 'Logistics']),
('Senior Visit', '2024-11-20', '14:00', '17:00', TRUE, 6, ARRAY[6,8], ARRAY[5], 12, 2, 'Senior Center', 'Visiting and helping seniors', ARRAY['Care', 'Empathy']);

-- More volunteer_waiting_list
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES
('Ivy Green', '2004-04-04', 'F', '912-345-6789', 'wait2@example.com', '234 Poplar St', 'MediCare', 'IDV2002', 'waituser2', 'hashedpassword12', 'https://example.com/img12.jpg'),
('Jack Black', '2002-06-18', 'M', '923-456-7890', 'wait3@example.com', '345 Cypress St', 'LifeCare', 'IDV2003', 'waituser3', 'hashedpassword13', 'https://example.com/img13.jpg');

-- More rejected_users
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES
('Karen White', '1997-03-12', 'F', '934-567-8901', 'rej2@example.com', '456 Magnolia St', 'SafeLife', 'IDR1002', 'rejuser2', 'hashedpassword14', 'https://example.com/img14.jpg'),
('Leo King', '1996-10-25', 'M', '945-678-9012', 'rej3@example.com', '567 Dogwood St', 'HealthPlus', 'IDR1003', 'rejuser3', 'hashedpassword15', 'https://example.com/img15.jpg');

-- More events_status
INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
VALUES (ARRAY[2,3], ARRAY[4], ARRAY[1], ARRAY[5], ARRAY[6,7]),
       (ARRAY[5,6], ARRAY[]::integer[], ARRAY[7], ARRAY[8], ARRAY[1,2,3]);
