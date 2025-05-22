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

-- Volunteer
-- Assuming user_id 1 (johndoe) and 3 (alicew) are volunteers
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, orgs) VALUES
(1, 'John Doe', '1990-05-15', 'M', 'Global Health Insurance', 'IDN123456789', 150, 10, ARRAY['Community Helpers', 'Green Earth Initiative']),
(3, 'Alice Wonderland', '1995-11-20', 'F', 'SecureLife Coverage', 'IDN987654321', 75, 5, ARRAY['Animal Shelter Volunteers']);
-- Note: bob.builder (user_id 4) is banned, so might not be in the volunteer table or have 0 hours.
-- For this example, let's assume banned users might still have a record if they were previously a volunteer.
INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number, approved_hours, unapproved_hours, orgs) VALUES
(4, 'Bob Builder', '1985-02-10', 'M', 'BuildWell Insurance', 'IDNBUILDER001', 20, 0, ARRAY['Habitat Builders']);


-- Organizer
-- Assuming user_id 2 (janesmith) and 5 (caroldanvers) are organizers
INSERT INTO organizer (user_id, org_name, given_hours, vol_id) VALUES
(2, 'Helping Hands Org', 500, ARRAY[1]), -- Jane Smith's org, John Doe is a volunteer associated
(5, 'Planeteers Foundation', 300, ARRAY[3]); -- Carol Danvers' org, Alice Wonderland is associated

-- Volunteer Waiting List
INSERT INTO volunteer_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, profile_image_url) VALUES
('Peter Parker', '2001-08-10', 'M', '234-567-8901', 'peter.parker@newyork.com', '20 Ingram St, Queens, NY', 'Daily Bugle Health', 'IDNPP001', 'spidey', 'hashed_spidey_pass', ARRAY['Application submitted'], 'http://example.com/profiles/spidey_wait.jpg'),
('Diana Prince', '1970-03-22', 'F', '345-678-9012', 'diana.prince@themyscira.com', 'Themyscira Island', 'Amazonian Shield', 'IDNDP002', 'wonderwoman', 'hashed_wonder_pass', ARRAY['Application submitted', 'Awaiting review'], NULL);

-- Rejected Users
INSERT INTO rejected_users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, logs, profile_image_url) VALUES
('Lex Luthor', '1975-09-01', 'M', '666-666-6666', 'lex.luthor@lexcorp.com', 'LexCorp Tower, Metropolis', 'LexCorp Premium', 'IDNLEX001', 'lexmaster', 'hashed_lex_pass', ARRAY['Application submitted', 'Rejected: Conflict of interest'], 'http://example.com/profiles/lex_rejected.jpg'),
('Selina Kyle', '1988-07-14', 'F', '777-888-9999', 'selina.kyle@gotham.cat', 'Penthouse, Gotham City', 'Nine Lives Insurance', 'IDNSK001', 'catwoman', 'hashed_cat_pass', ARRAY['Application submitted', 'Rejected: Background check failed'], 'http://example.com/profiles/cat_rejected.jpg');

-- Events
-- Assuming org_id 2 (Helping Hands Org - Jane Smith) and 5 (Planeteers Foundation - Carol Danvers)
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description) VALUES
('Community Clean-Up Day', '2025-06-15', '09:00:00', '14:00:00', TRUE, 2, ARRAY[1], ARRAY[]::INT[], 50, 1, 'Central Park, Anytown', 'Join us to clean up Central Park and make our city greener!'),
('Animal Shelter Adoption Drive', '2025-07-20', '11:00:00', '16:00:00', TRUE, 5, ARRAY[3], ARRAY[]::INT[], 30, 1, 'Anytown Animal Shelter', 'Help find forever homes for our lovely animals. Volunteers needed for various roles.'),
('Fundraising Gala Prep', '2025-08-01', '10:00:00', '18:00:00', FALSE, 2, ARRAY[]::INT[], ARRAY[]::INT[], 20, 0, 'Grand Ballroom, Anytown', 'Assist with setting up and organizing our annual fundraising gala. This event is in planning (is_active=FALSE).'),
('Tree Planting Initiative', '2025-09-10', '08:00:00', '13:00:00', TRUE, 5, ARRAY[]::INT[], ARRAY[]::INT[], 100, 0, 'Green Valley National Park', 'Participate in our massive tree planting event to combat deforestation.'),
('Soup Kitchen Service', '2025-06-05', '17:00:00', '20:00:00', TRUE, 2, ARRAY[1], ARRAY[]::INT[], 15, 1, 'Downtown Soup Kitchen', 'Serve meals to those in need. This event has finished based on date, but is_active could be used differently.');

-- Events Status
-- This table structure is a bit unconventional. It assumes a single row holding arrays of event_ids.
-- Let's assume event_ids are 1, 2, 3, 4, 5 based on the insertions above.
-- approved: Events that are confirmed and ready.
-- rejected: (Comment in schema: "Check if Fadi wants this") - For now, I'll leave it empty or add a dummy.
-- pending: Events awaiting final approval or details.
-- ongoing: Events currently happening (this would typically be dynamic based on current date/time vs event_date/time).
-- finished: Events that have concluded.

-- For simplicity, let's categorize the events we created:
-- Event 1 (Community Clean-Up Day): Approved, upcoming
-- Event 2 (Animal Shelter Adoption Drive): Approved, upcoming
-- Event 3 (Fundraising Gala Prep): Pending (since is_active=FALSE, perhaps it's in a pending state)
-- Event 4 (Tree Planting Initiative): Approved, upcoming
-- Event 5 (Soup Kitchen Service): Finished (based on past date)

-- Clear existing data if any (as it's a single row design)
DELETE FROM events_status;

INSERT INTO events_status (approved, rejected, pending, ongoing, finished) VALUES
(ARRAY[1, 2, 4], ARRAY[]::INT[], ARRAY[3], ARRAY[]::INT[], ARRAY[5]);

-- Note on event_status.ongoing:
-- For 'ongoing', this would typically be determined by a query comparing current_timestamp
-- with event_date, event_start, and event_end rather than a static list.
-- For dummy data, if an event was meant to be "ongoing" at the time of data insertion:
-- e.g., if today was 2025-06-15 and event 1 was from 09:00 to 14:00, it might be in 'ongoing'.
-- For this static script, I'll leave 'ongoing' empty unless you have specific IDs to place there.

-- Update organizer vol_id arrays based on who is in their events
-- This is a bit manual for dummy data; in a real app, this would be dynamic.
-- Organizer 2 (Jane) has event 1 with vol 1.
-- Organizer 5 (Carol) has event 2 with vol 3.
UPDATE organizer SET vol_id = ARRAY_APPEND(vol_id, 1) WHERE user_id = 2 AND 1 <> ALL(vol_id);
UPDATE organizer SET vol_id = ARRAY_APPEND(vol_id, 3) WHERE user_id = 5 AND 3 <> ALL(vol_id);

-- Add more volunteers to events for better testing
-- Let's say Alice (volunteer user_id 3) also signs up for Jane's (organizer user_id 2) 'Community Clean-Up Day' (event_id 1)
UPDATE events SET vol_id = ARRAY_APPEND(vol_id, 3), current_number_of_vol = current_number_of_vol + 1 WHERE event_id = 1;
-- And John (volunteer user_id 1) signs up for Carol's (organizer user_id 5) 'Tree Planting Initiative' (event_id 4)
UPDATE events SET vol_id = ARRAY_APPEND(vol_id, 1), current_number_of_vol = current_number_of_vol + 1 WHERE event_id = 4;

-- Update organizer vol_id arrays again
UPDATE organizer SET vol_id = ARRAY_APPEND(vol_id, 3) WHERE user_id = 2 AND 3 <> ALL(vol_id);
UPDATE organizer SET vol_id = ARRAY_APPEND(vol_id, 1) WHERE user_id = 5 AND 1 <> ALL(vol_id);