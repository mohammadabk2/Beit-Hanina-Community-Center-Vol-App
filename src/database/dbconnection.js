// to interact with the database
import db from "./db.js";
//TODO change the functions to get certain columns instead of *
//TODO some functions rely on names maybe the should also get id

/**
 * Moves a volunteer from the waiting list to the main users and volunteer tables.
 *
 * @async
 * @param {number} waitingListId - The ID of the volunteer in the volunteer_waiting_list table.
 * @returns {Promise<Object>} The combined user and volunteer data after insertion.
 * @throws {Error} If any database operation fails.
 */
const createVolunteer = async (waitingListId) => {
  const client = await db.pool.connect();
  try {
    await client.query("BEGIN");

    // Fetch data from waiting list table
    const fetchText = `
      SELECT *
      FROM volunteer_waiting_list
      WHERE id = $1
      FOR UPDATE;`;
    const fetchRes = await client.query(fetchText, [waitingListId]);

    if (fetchRes.rows.length === 0) {
      throw new Error(
        `No volunteer found with id ${waitingListId} in waiting list.`
      );
    }

    const v = fetchRes.rows[0];

    // Insert into users table
    const userInsertText = `
      INSERT INTO users (phone_number, email, address, username, password_hash, logs, profile_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;`;
    const userValues = [
      v.phone_number,
      v.email,
      v.address,
      v.username,
      v.password_hash,
      v.logs || [],
      v.profile_image_url || null,
    ];
    const userRes = await client.query(userInsertText, userValues);
    const user = userRes.rows[0];

    // Insert into Volunteer table
    const volunteerInsertText = `
      INSERT INTO volunteer (user_id, name, birth_date, sex, insurance, id_number)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;
    const volunteerValues = [
      user.id,
      v.name,
      v.birth_date,
      v.sex,
      v.insurance,
      v.id_number,
    ];
    const volunteerRes = await client.query(
      volunteerInsertText,
      volunteerValues
    );
    const volunteer = volunteerRes.rows[0];

    //  Delete from waiting list
    const deleteText = `DELETE FROM volunteer_waiting_list WHERE id = $1;`;
    await client.query(deleteText, [waitingListId]);

    await client.query("COMMIT");

    return {
      ...user,
      ...volunteer,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw new Error(
      "Failed to move volunteer from waiting list: " + err.message
    );
  } finally {
    client.release();
  }
};

/**
 * return the users table
 * @async
 * @param {string} tableName
 * @param {string} columnNames
 * @returns  {Promise<Object|null>}
 */
const getUsers = async (tableName, columnNames) => {
  try {
    const text = `SELECT ${columnNames} FROM ${tableName};`;
    const res = await db.query(text);
    return res.rows;
  } catch (error) {
    console.error("Error during getUsers query:", error);
    return null;
  }
};

/**
 * Updates the properties of a user in the users table.
 * Fields with null values are ignored and remain unchanged.
 *
 * @async
 * @param {number} userId - The ID of the user to update.
 * @param {Object} updates - An object containing the fields to update.
 * @param {string} [updates.name] - The updated name.
 * @param {string} [updates.birthDate] - The updated birth date (YYYY-MM-DD).
 * @param {string} [updates.sex] - The updated sex (M/F).
 * @param {string} [updates.phoneNumber] - The updated phone number.
 * @param {string} [updates.email] - The updated email.
 * @param {string} [updates.address] - The updated address.
 * @param {string} [updates.insurance] - The updated insurance.
 * @param {string} [updates.idNumber] - The updated ID number (must be unique).
 * @param {string} [updates.username] - The updated username (must be unique).
 * @param {string} [updates.passwordHash] - The updated password hash.
 * @returns {Promise<Object|null>} The updated user object or null if the user does not exist.
 * @throws {Error} If the database query fails.
 */
const updateUser = async (userId, updates) => {
  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid user ID");
  }

  const allowedColumns = new Set([
    "name",
    "birth_date",
    "sex",
    "phone_number",
    "email",
    "address",
    "insurance",
    "id_number",
    "username",
    "password_hash",
  ]);

  const validUpdates = Object.entries(updates).filter(
    ([key, value]) =>
      allowedColumns.has(key) && value !== null && value !== undefined
  );

  if (validUpdates.length === 0) {
    throw new Error("No valid updates provided");
  }

  const setClause = validUpdates
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(", ");
  const values = [userId, ...validUpdates.map(([, value]) => value)];

  const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *;`;

  try {
    const res = await db.query(query, values);
    return res.rows[0] || null; // Return updated user or null if not found
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

/**
 * Retrieves a user from the database by Serial ID.
 *
 * @async
 * @param {number} id - The Serial ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
const getUserById = async (id) => {
  const text = "SELECT * FROM users WHERE id = $1;";
  const res = await db.query(text, [id]);
  return res.rows[0];
};

/**
 * Retrieves a user from the database by ID Number.
 *
 * @async
 * @param {number} id - The ID Number of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
const getUserByIdNumber = async (id) => {
  const text = "SELECT id FROM users WHERE id_number = $1;";
  const res = await db.query(text, [id]);
  return res.rows[0];
};

/**
 * Assigns a role to a user by inserting an entry into the `user_role` table.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} roleName - The name of the role to assign (Admin,Org,Vol).
 * @returns {Promise<Object|null>} A promise that resolves to the assigned role object if successful, or null if not.
 * @throws {Error} If the database query fails.
 */
const assignRoleToUser = async (userId, roleName) => {
  const text = `
  UPDATE users
  SET role = array_append(COALESCE(role, '{}'), $2)
  WHERE user_id = $1
  RETURNING *;
`;

  const values = [userId, roleName];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null; // Return updated row or null if no user was found
  } catch (error) {
    console.error("Error adding roleName:", error);
    throw new Error("Failed to add roleName");
  }
};

/**
 * Retrieves volunteer details (total hours and Orgs name) for a user by their ID.
 *
 * @async
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing volunteer details or null if not found.
 * @throws {Error} If the database query fails.
 */
const getVolunteerDetailsById = async (id) => {
  const text = `
      SELECT * 
      FROM volunteer v
      WHERE v.user_id = $1;
    `;
  const res = await db.query(text, [id]);
  return res.rows[0];
};

/**
 * Retrieves organizer details (organization name and vol_id) for a user by their ID.
 *
 * @async
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing organizer details or null if not found.
 * @throws {Error} If the database query fails.
 */
const getOrganizerDetailsById = async (id) => {
  const text = `
      SELECT *
      FROM organizer o
      WHERE o.user_id = $1;
    `;
  const res = await db.query(text, [id]);
  return res.rows[0];
};

/**
 * Adds a org to the array for a volunteer.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} tag - The tag to be added.
 * @returns {Promise<Object|null>} A promise that resolves to the updated volunteer object if successful, or null if not found.
 * @throws {Error} If the database query fails.
 */
const addOrgToVolunteer = async (userId, tag) => {
  const text = `
      UPDATE volunteer
      SET orgs = array_append(COALESCE(orgs, '{}'), $2)
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, tag];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null; // Return updated row or null if no user was found
  } catch (error) {
    console.error("Error adding tag:", error);
    throw new Error("Failed to add tag");
  }
};

/**
 * Increments the hours for a volunteer.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {String} hourType - The number of hours to add.
 * @param {number} hours - The number of hours to add.
 * @returns {Promise<Object|null>} A promise that resolves to the updated volunteer object if successful, or null if the user is not found.
 * @throws {Error} If the database query fails.
 */
const incrementVolHours = async (userId, hourType, hours) => {
  const allowedFields = ["approved_hours", "unapproved_hours"]; // Add any other allowed fields here
  if (!allowedFields.includes(hourType)) {
    throw new Error("Invalid field name");
  }
  const text = `
      UPDATE volunteer
      SET ${hourType} = ${hourType} + $2
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, hours];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null; // Return updated row or null if no user was found
  } catch (error) {
    console.error("Error incrementing total hours:", error);
    throw new Error("Failed to update total hours");
  }
};

/**
 * Increments the given hours for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {number} hours - The number of hours to add.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
const incrementGivenHours = async (userId, hours) => {
  const text = `
      UPDATE organizer
      SET given_hours = given_hours + $2
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, hours];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error incrementing given hours:", error);
    throw new Error("Failed to update given hours");
  }
};

/**
 * Updates the organization name for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {string} newOrgName - The new organization name.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
const updateOrgName = async (userId, newOrgName) => {
  const text = `
      UPDATE organizer
      SET org_name = $2
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, newOrgName];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error updating organization name:", error);
    throw new Error("Failed to update organization name");
  }
};

/**
 * Adds a vol to the array volunteers for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {string} vol - The tag to be added.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
const addVolToOrganizer = async (userId, vol) => {
  const text = `
      UPDATE organizer
      SET vol_id = array_append(COALESCE(vol_id, '{}'), $2)
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, vol];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error adding tag to organizer:", error);
    throw new Error("Failed to add tag");
  }
};

/**
 * Creates a new user and an associated organizer record.
 *
 * @async
 * @param {string} orgName - The name of the organization.
 * @param {string} orgAddress - The address of the organization.
 * @param {string} orgAdmin - The username of the organization admin.
 * @param {string} orgPhoneNumber - The phone number of the organization.
 * @param {string} orgEmail - The email of the organization.
 * @param {string} username - The desired username for the organization admin.
 * @param {string} password - The password for the organization admin.
 * @returns {Promise<Object>} A promise that resolves to an object containing the newly created user and organizer data.
 * @throws {Error} If any of the database queries fail.
 */
const createOrganizer = async (
  orgName,
  orgAddress,
  orgAdmin,
  orgPhoneNumber,
  orgEmail,
  username,
  password
) => {
  try {
    // First, insert the user data into the users table
    const userInsertText = `
      INSERT INTO users (phone_number, email, address, username, password_hash, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const userInsertValues = [
      orgPhoneNumber,
      orgEmail,
      orgAddress,
      username,
      password,
      "organizer",
    ];
    const userResult = await db.query(userInsertText, userInsertValues);

    if (userResult.rows.length === 0) {
      throw new Error("Failed to insert user data.");
    }

    const userId = userResult.rows[0].id;
    const organizerInsertText = `
      INSERT INTO organizer (user_id, org_name)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const organizerInsertValues = [userId, orgName];
    const organizerResult = await db.query(
      organizerInsertText,
      organizerInsertValues
    );

    if (organizerResult.rows.length === 0) {
      throw new Error("Failed to insert organizer data.");
    }
    return userResult.rows[0];
  } catch (error) {
    console.error("Error creating user and organizer:", error);
    throw error;
  }
};

/**
 * adds a new event to the events table.
 * @param {String} eventName
 * @param {Date} eventDate
 * @param {Time} eventStartTime
 * @param {Time} eventEndTime
 * @param {number} orgId
 * @returns
 */
const addEvent = async (
  eventName,
  eventDate,
  eventStartTime,
  eventEndTime,
  isActive,
  orgId,
  maxNumberOfVolunteers,
  eventLocation,
  eventDescription
) => {
  const text = `
  INSERT INTO events (event_name, event_date, event_start, event_end, 
  is_active, org_id, max_number_of_vol,
  event_location, event_description)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *;
`;

  const values = [
    eventName,
    eventDate,
    eventStartTime,
    eventEndTime,
    isActive,
    orgId,
    maxNumberOfVolunteers,
    eventLocation,
    eventDescription,
  ];
  try {
    const res = await db.query(text, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error in addEvent:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * adds a vol id to the array of vol at the events table.
 * @param {String} eventName
 * @param {number} volId
 * @returns
 */
const addVolId = async (eventName, volId) => {
  const text = `
  UPDATE events
  SET vol_id = array_append(COALESCE(vol_id, '{}'), $1)
  WHERE event_name = $2
  RETURNING *;
`;

  const values = [volId, eventName];
  const res = await db.query(text, values);
  return res.rows[0];
};

/**
 *
 * @param {String} eventName
 * @param {Boolean} status
 * @returns
 */
const changeStatus = async (eventName, status) => {
  const text = `
  UPDATE events
  SET is_active = $2
  WHERE event_name = $1
  RETURNING *;
`;

  const values = [eventName, status];
  try {
    const res = await db.query(text, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
};

/**
 * Retrieves user hash by userName
 *
 * @async
 * @param {string} username - The username of the user.
 * @returns {Promise<string|null>} A promise that resolves to the user hash object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
const getUserHash = async (username) => {
  const text = "SELECT id, password_hash, role FROM users WHERE username = $1;";
  const res = await db.query(text, [username]);
  return res.rows[0];
};

/**
 * Retrieves user hash by userName
 *
 * @async
 * @param {string} username - The username of the user.
 * @returns {Promise<string|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
//TODO commented this to fix eslint issue
// const getEvents = async (columnNames, orgId) => {
  const getEvents = async (columnNames) => {
  // Return query for fetching event ids from each field
  const unionQueries = columnNames.map(colName => {
    return `SELECT UNNEST(${colName}) FROM events_status
    WHERE ${colName} IS NOT NULL AND array_length(${colName}, 1) > 0`
  });
  // Join queries together
  const idsQuery = unionQueries.join(' UNION ALL ');
  console.log(`full query: ${idsQuery}`)
  try {
    // Stores event ids in values as array
    const values = await db.query(idsQuery);
    const idsToFetch = values.rows.map(row => row.unnest);
    // Fetches requested events from events table
    const eventsQuery = `SELECT * FROM events WHERE event_id = ANY($1::int[]);`
    const res = await db.query(eventsQuery, [idsToFetch]);

    return res.rows; // Return the entire array of rows
  } catch (error) {
    console.error("Error in getEvents:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Adds a log to the Logs array of a user
 *
 * @async
 * @param {number} userID - The ID of the user.
 * @param {string} logMessage - new entry to the logs array
 * @returns {Promise<string|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
const addLog = async (userId, logMessage) => {
  const text = `UPDATE users SET logs = array_append(COALESCE(logs, ARRAY[]::TEXT[]), $1) WHERE id = $2 RETURNING *;`;
  const values = [logMessage, userId];

  try {
    const res = await db.query(text, values);

    if (res.rows.length === 0) {
      console.warn(`User with id ${userId} not found`);
      return null;
    }

    return res.rows[0];
  } catch (error) {
    console.error("Error in addLog:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Creates a new user in the database.
 *
 * @async
 * @param {string} tableName - Name of the table to be add to users_waiting_list or users
 * @param {string} name - The full name of the user.
 * @param {Date} birthDate - The birth date of the user (YYYY-MM-DD).
 * @param {string} sex - The gender of the user (e.g., 'M' or 'F').
 * @param {number} phoneNumber - The user's phone number.
 * @param {string} email - The user's email address.
 * @param {string} address - The user's home address.
 * @param {string} insurance - The user's insurance provider.
 * @param {number} idNumber - The user's government ID number.
 * @param {string} username - The chosen username for the user.
 * @param {string} passwordHash - The hashed password.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 * @throws {Error} If the database query fails.
 */
const createUser = async (
  tableName,
  name,
  birthDate,
  sex,
  phoneNumber,
  email,
  address,
  insurance,
  idNumber,
  username,
  passwordHash
) => {
  const text = `
    INSERT INTO ${tableName} (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;`;
  const values = [
    name,
    birthDate,
    sex,
    phoneNumber,
    email,
    address,
    insurance,
    idNumber,
    username,
    passwordHash,
  ];
  try {
    const res = await db.query(text, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Moves user from waiting list to rejected list.
 * @param {number} userId - User id to reject.
 * @returns {Promise<Object>} A promise that resolves to the newly rejected user object.
 * @throws {Error} If the database query fails.
 */
const rejectUser = async (userId) => {
  const text = `
  INSERT INTO rejected_users
  SELECT * FROM volunteer_waiting_list
  WHERE id = $1
  RETURNING *;`;

  const values = [userId];
  try {
    const res = await db.query(text, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error in rejectUser:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default {
  // Currently using
  getUsers,
  getUserHash,
  getEvents,
  createVolunteer,
  addLog,
  createUser,
  rejectUser,
  createOrganizer,
  addEvent,

  // Currently for testing unused
  getUserById, // tested
  assignRoleToUser,
  getVolunteerDetailsById, // tested
  getOrganizerDetailsById, // tested
  updateOrgName, // tested
  incrementGivenHours, // tested
  incrementVolHours, // tested
  addOrgToVolunteer, // tested
  updateUser,
  getUserByIdNumber,
  addVolToOrganizer,
  addVolId,
  changeStatus,
};
