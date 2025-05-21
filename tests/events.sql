WITH inserted_events AS (
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, max_number_of_vol, current_number_of_vol, event_location, event_description)
VALUES
    ('Community Cleanup Drive', '2025-06-10', '09:00:00', '12:00:00', TRUE, 6, 30, 10, 'Central Park', 'Help us keep our park clean and green!'),
    ('Summer Music Festival', '2025-07-15', '18:00:00', '22:00:00', TRUE, 6, 200, 80, 'Amphitheater', 'Annual festival featuring local bands.'),
    ('Senior Citizen Brunch', '2025-06-25', '11:00:00', '13:00:00', FALSE, 6, 50, 45, 'Community Hall', 'A delightful brunch for our beloved seniors.'),
    ('Youth Coding Workshop', '2025-07-01', '10:00:00', '16:00:00', TRUE, 6, 25, 15, 'Library Auditorium', 'Learn the basics of coding with fun projects.'),
    ('Neighborhood Watch Meeting', '2025-06-05', '19:00:00', '20:30:00', TRUE, 6, 20, 18, 'Online via Zoom', 'Discussing local safety initiatives.')
RETURNING event_id, event_name, is_active -- Return IDs for further use
)
-- ---
-- Section 2: Populating the 'events_status' table using IDs from 'events'
-- ---
-- We need to get the generated IDs first.
-- This part of the script is typically run after you've identified the IDs,
-- or dynamically in your application logic.
-- For a single script, you'd chain it with a CTE or multiple steps.

-- To make this a single runnable script, we'll assign IDs to statuses based on their position
-- This assumes the CTE 'inserted_events' orders IDs predictably, which it does based on insertion order.
-- In a real application, you'd fetch the IDs and then insert.

INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
SELECT
    -- Approved (e.g., event 1, 4)
    ARRAY(SELECT event_id FROM inserted_events WHERE event_name IN ('Community Cleanup Drive', 'Youth Coding Workshop')) AS approved,
    -- Rejected (e.g., event 3)
    ARRAY(SELECT event_id FROM inserted_events WHERE event_name = 'Senior Citizen Brunch') AS rejected,
    -- Pending (e.g., event 2)
    ARRAY(SELECT event_id FROM inserted_events WHERE event_name = 'Summer Music Festival') AS pending,
    -- Ongoing (e.g., event 5)
    ARRAY(SELECT event_id FROM inserted_events WHERE event_name = 'Neighborhood Watch Meeting') AS ongoing,
    -- Finished (no specific finished event in this set, so it could be empty or populated differently)
    ARRAY[]::INT[] AS finished -- Explicitly an empty integer array
FROM inserted_events
LIMIT 1; -- We only need one row for events_status