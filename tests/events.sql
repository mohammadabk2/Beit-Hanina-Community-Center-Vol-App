-- Insert initial data into the events table
INSERT INTO events (
    event_name,
    event_date,
    event_start,
    event_end,
    is_active,
    org_id,
    vol_id,
    vol_id_waiting_list,
    max_number_of_vol,
    current_number_of_vol,
    event_location,
    event_description
) VALUES
    ('Community Cleanup',  -- event_name
     '2024-03-10',       -- event_date
     '09:00',            -- event_start
     '12:00',            -- event_end
     TRUE,               -- is_active
     6,                -- org_id (assuming organizer with user_id 101 exists)
     '{1, 2, 3}',         -- vol_id (array of volunteer user_ids)
     '{}',                -- vol_id_waiting_list (empty array)
     10,                 -- max_number_of_vol
     3,                  -- current_number_of_vol
     'City Park',         -- event_location
     'Help clean up our local park!' -- event_description
    ),
    ('Food Bank Drive',
     '2024-04-15',
     '14:00',
     '17:00',
     TRUE,
     6,
     '{4, 5}',
     '{6}',
     5,
     2,
     'Community Center',
     'Collecting food donations for those in need.'
    ),
    ('Tree Planting',
     '2024-05-20',
     '10:00',
     '16:00',
     TRUE,
     6,
     '{}',
     '{7, 8, 9}',
     20,
     0,
     'Forest Preserve',
     'Planting trees to improve our environment.'
    ),
    ('Senior Companion Visit',
     '2024-06-01',
     '10:00',
     '12:00',
     TRUE,
     6,
     '{10,11}',
     '{}',
     15,
     2,
     'Harmony Senior Living',
     'Spend time with seniors.'
    ),
    ('Marathon Aid Station',
     '2024-07-04',
     '07:00',
     '14:00',
     TRUE,
     6,
     '{12,13,14,15,16}',
     '{}',
     20,
     5,
     'Marathon Route Mile 10',
     'Hand out water and cheer on runners.'
    ),
   ('Beach Cleanup',
     '2024-08-10',
     '08:00',
     '11:00',
     TRUE,
     6,
     '{17, 18, 19}',
     '{}',
     12,
     3,
     'Sandy Shores Beach',
     'Help clean up litter from the beach.'
     ),
   ('Tutoring Program',
    '2024-09-01',
    '16:00',
    '18:00',
    TRUE,
    6,
    '{20, 21}',
    '{22}',
    8,
    2,
    'Community Library',
    'Provide tutoring to students.'
   ),
  ('Park Beautification',
    '2024-10-12',
    '09:00',
    '13:00',
    TRUE,
     6,
    '{23, 24, 25, 26}',
    '{}',
    15,
    4,
    'Central Park',
    'Help plant flowers and maintain the park.'
   ),
  ('Holiday Toy Drive',
    '2024-12-01',
    '10:00',
    '15:00',
    TRUE,
    6,
    '{27, 28}',
    '{29}',
    10,
    2,
    'Town Hall',
    'Collect toys for children in need.'
   ),
   ('River Cleanup',
    '2025-03-15',
    '09:30',
    '12:30',
    TRUE,
    6,
    '{30, 31, 32, 33}',
    '{}',
    12,
    4,
    'Riverfront Park',
    'Help clean up the riverbank and surrounding areas.'
  );

--  Important Considerations and Improvements

--  1.  Error Handling: The query assumes that organizer user IDs (org_id) like 101, 102, etc., exist in the organizer table.  If they don't, the INSERT statements will fail due to the foreign key constraint.  In a real application, you should handle this, perhaps by:
--      * Checking for the existence of the organizer before inserting the event.
--      * Using a default organizer ID for events where the organizer is unknown.
--      * Displaying an error message to the user.

--  2.  Data Validation: The query assumes that the data provided is valid.  You might want to add constraints or checks to ensure:
--      * event_end is after event_start.
--      * event_date is a valid date.
--      * max_number_of_vol is not negative.
--      * current_number_of_vol is not greater than max_number_of_vol.
--      * Arrays vol_id and vol_id_waiting_list only contain valid user IDs.

-- 3. Array Handling:  PostgreSQL uses curly braces {} to define arrays.  The example uses integers, but you can store other data types in arrays as well.  Empty arrays are represented by '{}'.

-- 4.  ON DELETE SET NULL: The  `ON DELETE SET NULL`  clause in the  `org_id`  foreign key means that if an organizer is deleted from the  `organizer`  table, the  `org_id`  in the  `events`  table will be set to  `NULL`  for events organized by that organizer.  This prevents orphaned records.

-- 5. is_active: This column is useful for marking events that are no longer accepting volunteers or that have been cancelled, without deleting them from the database.

-- 6. current_number_of_vol:  This field should be updated whenever a volunteer signs up for or withdraws from an event.  You'll need additional queries (UPDATE statements) to manage this.  It is included here for completeness.

-- 7. Event Description: The event_description field is set to a default value of '' (empty string).

-- 8. Event Location: The event_location field is mandatory.

-- 9.  Data Types:
--     * `DATE`  stores only the date (e.g., '2024-03-10').
--     * `TIME`  stores only the time of day (e.g., '09:00').
--     * `TEXT`  stores strings of any length.
--     * `BOOLEAN` stores TRUE or FALSE values.
--     * `INT[]` stores an array of integers.
