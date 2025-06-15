-- Dummy data for the database schema

-- Users
INSERT INTO users (phone_number, email, address, username, password_hash, banned, logs, role, profile_image_url) VALUES
('123-456-7890', 'john.doe@example.com', '123 Main St, Anytown, USA', 'admin', 'password', FALSE, ARRAY['User created', 'Logged in'], 'admin', 'http://example.com/profiles/johndoe.jpg'),
('987-654-3210', 'jane.smith@example.com', '456 Oak Ave, Anytown, USA', 'org', 'password', FALSE, ARRAY['User created'], 'organizer', 'http://example.com/profiles/janesmith.jpg'),
('555-123-4567', 'alice.wonder@example.com', '789 Pine Ln, Anytown, USA', 'vol', 'password', FALSE, ARRAY['User created', 'Updated profile'], 'volunteer', 'http://example.com/profiles/alicew.jpg'),
('555-987-6543', 'bob.builder@example.com', '101 Builder Rd, Buildsville, USA', 'bobthebuilder', 'password', TRUE, ARRAY['User created', 'Banned due to inactivity'], 'volunteer', 'http://example.com/profiles/bob.jpg'),
('555-555-5555', 'carol.danvers@example.com', '202 Sky High, Metropolis, USA', 'captainmarvel', 'password', FALSE, ARRAY['User created'], 'volunteer', NULL),
('111-222-3333', 'pending.user@example.com', '303 Waitlist Way, Temp Town, USA', 'pendinguser', 'password', FALSE, ARRAY['Registration attempt'], 'volunteer', 'http://example.com/profiles/pending.jpg'),
('444-555-6666', 'rejected.user@example.com', '404 Reject Rd, Outcast City, USA', 'rejecteduser', 'password', FALSE, ARRAY['Registration attempt', 'Application rejected'], 'volunteer', 'http://example.com/profiles/rejected.jpg');

-- VOLUNTEERS
-- Assuming user_ids by insertion order: 1 = admin, 2 = org, 3 = vol, 4 = bob, 5 = carol, 6 = pending, 7 = rejected

INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, orgs) VALUES
(3, 'Alice Wonderland', '1995-11-20', 'F', 'SecureLife Coverage', 'IDN987654321', 75, 5, ARRAY[5]),
(4, 'Bob Builder', '1985-02-10', 'M', 'BuildWell Insurance', 'IDNBUILDER001', 20, 5, ARRAY[2]),
(6, 'Pending User', '2000-01-01', 'M', 'Some Insurance', 'IDNPENDING001', 2, 3, ARRAY[1]),
(7, 'Rejected User', '1999-01-01', 'F', 'Rejected Insurance', 'IDNREJECTED001', 11, 12, ARRAY[2]);



-- ORGANIZERS
INSERT INTO organizer (user_id, org_name, given_hours, vol_id) VALUES
(2, 'Helping Hands Org', 500, ARRAY[3]),      -- Jane Smith's org, Alice (user_id 3) is a volunteer
(5, 'Planeteers Foundation', 300, ARRAY[4]);

-- Volunteer Waiting List
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, occupation, id_number, username, password_hash, logs, profile_image_url) VALUES
('Peter Parker', '2001-08-10', 'M', '234-567-8901', 'peter.parker@newyork.com', '20 Ingram St, Queens, NY', 'Daily Bugle Health', 'Clalit', 'IDNPP001', 'spidey', 'hashed_spidey_pass', ARRAY['Application submitted'], 'http://example.com/profiles/spidey_wait.jpg'),
('Diana Prince', '1970-03-22', 'F', '345-678-9012', 'diana.prince@themyscira.com', 'Themyscira Island', 'Amazonian Shield', 'Clalit','IDNDP002', 'wonderwoman', 'hashed_wonder_pass', ARRAY['Application submitted', 'Awaiting review'], NULL);

-- Rejected Users
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, profile_image_url) VALUES
('Lex Luthor', '1975-09-01', 'M', '666-666-6666', 'lex.luthor@lexcorp.com', 'LexCorp Tower, Metropolis', 'LexCorp Premium', 'IDNLEX001', 'lexmaster', 'hashed_lex_pass', ARRAY['Application submitted', 'Rejected: Conflict of interest'], 'http://example.com/profiles/lex_rejected.jpg'),
('Selina Kyle', '1988-07-14', 'F', '777-888-9999', 'selina.kyle@gotham.cat', 'Penthouse, Gotham City', 'Nine Lives Insurance', 'IDNSK001', 'catwoman', 'hashed_cat_pass', ARRAY['Application submitted', 'Rejected: Background check failed'], 'http://example.com/profiles/cat_rejected.jpg');

-- EVENTS
INSERT INTO events (
  event_name, event_date, event_start, event_end, is_active,
  org_id, vol_id, vol_id_waiting_list,
  max_number_of_vol, current_number_of_vol,
  event_location, event_description
) VALUES
('Community Clean-Up Day', '2025-06-15', '09:00:00', '14:00:00', TRUE, 2, ARRAY[3], ARRAY[6], 50, 1, 'Central Park, Anytown', 'Join us to clean up Central Park and make our city greener!'),
('Animal Shelter Adoption Drive', '2025-07-20', '11:00:00', '16:00:00', TRUE, 5, ARRAY[4], ARRAY[]::INT[], 30, 1, 'Anytown Animal Shelter', 'Help find forever homes for our lovely animals. Volunteers needed for various roles.'),
('Fundraising Gala Prep', '2025-08-01', '10:00:00', '18:00:00', FALSE, 2, ARRAY[]::INT[], ARRAY[]::INT[], 20, 0, 'Grand Ballroom, Anytown', 'Assist with setting up and organizing our annual fundraising gala. This event is in planning.'),
('Tree Planting Initiative', '2025-09-10', '08:00:00', '13:00:00', TRUE, 5, ARRAY[]::INT[], ARRAY[]::INT[], 100, 0, 'Green Valley National Park', 'Participate in our massive tree planting event to combat deforestation.'),
('Soup Kitchen Service', '2025-06-05', '17:00:00', '20:00:00', TRUE, 2, ARRAY[3], ARRAY[]::INT[], 15, 1, 'Downtown Soup Kitchen', 'Serve meals to those in need.');

-- EVENTS STATUS
DELETE FROM events_status;

INSERT INTO events_status (approved, rejected, pending, ongoing, finished) VALUES
(ARRAY[1, 2, 4], ARRAY[]::INT[], ARRAY[3], ARRAY[]::INT[], ARRAY[5]);
