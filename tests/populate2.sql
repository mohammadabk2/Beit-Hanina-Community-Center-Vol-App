-- populate2.sql - Sample data for the volunteer management database

-- Sample users (approved)
INSERT INTO users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, role, profile_image_url)
VALUES 
  ('أحمد محمود', '1990-05-15', 'M', '0501234567', 'ahmad@example.com', 'القدس، بيت حنينا، شارع الرئيسي', 'كلاليت', '123456789', 'ahmad90', '$2a$10$xJwL5vbsfSKp8YYizXvZ1eU6LIQroVwQY/2YW1Zcu9YGP5zwm0wb2', 'Vol', 'https://example.com/profiles/ahmad.jpg'),
  ('سارة خالد', '1995-03-22', 'F', '0521234567', 'sara@example.com', 'القدس، بيت حنينا، حي السلام', 'مئوحيدت', '234567890', 'sara95', '$2a$10$7gHJ5TfLh/hNyZ5QY3h8wevz1tKY4VXvJLu.fAqVz7MVvdHDr5TfC', 'Vol', 'https://example.com/profiles/sara.jpg'),
  ('محمد علي', '1988-11-10', 'M', '0531234567', 'mohammed@example.com', 'القدس، بيت حنينا، حي المدارس', 'مكابي', '345678901', 'mohammed88', '$2a$10$uqWk5S6VnUTaY.XZY5XYVee3aeOgeSWyTYShV/DQDwVux.aD4rKym', 'Org', 'https://example.com/profiles/mohammed.jpg'),
  ('فاطمة حسن', '1992-09-05', 'F', '0541234567', 'fatima@example.com', 'القدس، بيت حنينا، شارع القدس', 'ليئوميت', '456789012', 'fatima92', '$2a$10$a5GQy5xNd7TsZGvf3uLZje.9ZhJGQUzLzT5oYyAE7dFzWH1nYvXgG', 'Vol', 'https://example.com/profiles/fatima.jpg'),
  ('خالد إبراهيم', '1985-07-20', 'M', '0551234567', 'khaled@example.com', 'القدس، بيت حنينا، حي الجديد', 'كلاليت', '567890123', 'khaled85', '$2a$10$p6Ld8KJfVnZOhwJj6scbXu.YCTLwL2QzVg62.1X70fG3qKh8Gydea', 'Admin', 'https://example.com/profiles/khaled.jpg'),
  ('ليلى عمر', '1994-12-15', 'F', '0561234567', 'layla@example.com', 'القدس، بيت حنينا، شارع الزيتون', 'مكابي', '678901234', 'layla94', '$2a$10$MnFFdG.JKbv38vhX4q9.G.b3Fo0rJSn6aSXvpf1KRs6c.jsZw/Oc2', 'Vol', 'https://example.com/profiles/layla.jpg'),
  ('عمر سعيد', '1987-04-30', 'M', '0571234567', 'omar@example.com', 'القدس، بيت حنينا، حي الجامعة', 'مئوحيدت', '789012345', 'omar87', '$2a$10$0kW.vPr7DfhQT1oO97rFZeGjamKedSL0gx6rA0SvbUcbVb9.1/H3C', 'Org', 'https://example.com/profiles/omar.jpg');

-- Sample users waiting for approval
INSERT INTO users_waiting_list (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash, profile_image_url)
VALUES 
  ('ياسمين وليد', '1996-08-12', 'F', '0581234567', 'yasmin@example.com', 'القدس، بيت حنينا، شارع النور', 'كلاليت', '890123456', 'yasmin96', '$2a$10$JwL5vbsS3Kp8YYizXvZ1eU6LIQroVwQY/2YW1Zcu9YGP5zwm0wb2', 'https://example.com/profiles/yasmin.jpg'),
  ('نادر توفيق', '1993-02-25', 'M', '0591234567', 'nader@example.com', 'القدس، بيت حنينا، حي الورود', 'ليئوميت', '901234567', 'nader93', '$2a$10$1J5S6VnUTaY.XZY5XYVee3aeOgeSWyTYShV/DQDwVux.aD4rKym', 'https://example.com/profiles/nader.jpg'),
  ('هدى سامي', '1997-06-18', 'F', '0501234568', 'huda@example.com', 'القدس، بيت حنينا، شارع المسجد', 'مكابي', '012345678', 'huda97', '$2a$10$FQy5xNd7TsZGvf3uLZje.9ZhJGQUzLzT5oYyAE7dFzWH1nYvXgG', 'https://example.com/profiles/huda.jpg');

-- Sample volunteer data
INSERT INTO volunteer (user_id, approved_hours, unapproved_hours, orgs)
VALUES 
  (1, 30, 5, ARRAY['جمعية بيت حنينا', 'مركز الشباب']),
  (2, 45, 0, ARRAY['جمعية بيت حنينا']),
  (4, 20, 10, ARRAY['مركز الشباب', 'مركز التعليم']),
  (6, 15, 2, ARRAY['مركز الشباب']);

-- Sample organizer data
INSERT INTO organizer (user_id, org_name, given_hours, vol_id)
VALUES 
  (3, 'جمعية بيت حنينا', 50, ARRAY[1, 2]),
  (7, 'مركز الشباب', 35, ARRAY[1, 4, 6]);

-- Sample events
INSERT INTO events (event_name, event_date, event_start, event_end, is_active, org_id, vol_id, vol_id_waiting_list, max_number_of_vol, current_number_of_vol, event_location, event_description)
VALUES 
  ('تنظيف الحديقة العامة', '2025-05-20', '09:00:00', '13:00:00', TRUE, 3, ARRAY[1, 4], ARRAY[6], 10, 2, 'الحديقة العامة - بيت حنينا', 'حملة تنظيف وتجميل الحديقة العامة في بيت حنينا'),
  ('دروس تقوية للطلاب', '2025-05-25', '15:00:00', '18:00:00', TRUE, 7, ARRAY[2], ARRAY[], 5, 1, 'مركز المجتمع - بيت حنينا', 'دروس تقوية في الرياضيات والعلوم لطلاب المدارس'),
  ('يوم رياضي للأطفال', '2025-06-05', '10:00:00', '16:00:00', TRUE, 3, ARRAY[1, 2, 4], ARRAY[], 15, 3, 'الملعب الرياضي - بيت حنينا', 'تنظيم يوم رياضي ترفيهي للأطفال'),
  ('ورشة عمل حول البيئة', '2025-06-10', '14:00:00', '17:00:00', FALSE, 7, ARRAY[6], ARRAY[4], 8, 1, 'مركز الثقافة - بيت حنينا', 'ورشة عمل توعوية حول الحفاظ على البيئة وإعادة التدوير'),
  ('مخيم صيفي للأطفال', '2025-07-01', '08:00:00', '14:00:00', FALSE, 3, ARRAY[], ARRAY[1, 2, 4, 6], 20, 0, 'مركز الشباب - بيت حنينا', 'مخيم صيفي للأطفال يتضمن أنشطة تعليمية وترفيهية متنوعة');

-- Sample events status
INSERT INTO events_status (approved, rejected, pending, ongoing, finished)
VALUES 
  (ARRAY[1, 2, 3], ARRAY[], ARRAY[4, 5], ARRAY[1, 2], ARRAY[3]);