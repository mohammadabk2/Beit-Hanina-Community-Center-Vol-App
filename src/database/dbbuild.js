// to interact with the database

import db from "./db";

/**
 * Creates a new user in the database.
 *
 * @async
 * @param {string} name - The full name of the user.
 * @param {string} birthDate - The birth date of the user (YYYY-MM-DD).
 * @param {string} sex - The gender of the user (e.g., 'M' or 'F').
 * @param {string} phoneNumber - The user's phone number.
 * @param {string} email - The user's email address.
 * @param {string} address - The user's home address.
 * @param {string} insurance - The user's insurance provider.
 * @param {string} idNumber - The user's government ID number.
 * @param {string} username - The chosen username for the user.
 * @param {string} passwordHash - The hashed password.
 * @returns {Promise<Object>} A promise that resolves to the newly created user object.
 * @throws {Error} If the database query fails.
 */
async function createUser(
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
) {
  const text = `
    INSERT INTO users (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash)
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
  const res = await db.query(text, values);
  return res.rows[0];
}

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
async function updateUser(userId, updates) {
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
}

/**
 * Retrieves a user from the database by username and password hash.
 *
 * @async
 * @param {string} username - The username of the user.
 * @param {string} hash - The hashed password.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */

async function getUserByLogin(username, hash) {
  const text =
    "SELECT * FROM users WHERE username = $1 AND password_hash = $2;";
  const res = await db.query(text, [username, hash]);
  return res.rows[0];
}

/**
 * Retrieves a user from the database by Serial ID.
 *
 * @async
 * @param {Int} id - The username of the user.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
 * @throws {Error} If the database query fails.
 */
async function getUserById(id) {
  const text = "SELECT * FROM users WHERE id = $1;";
  const res = await db.query(text, [id]);
  return res.rows[0];
}

/**
 * Assigns a role to a user by inserting an entry into the `user_role` table.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} roleName - The name of the role to assign.
 * @returns {Promise<Object|null>} A promise that resolves to the assigned role object if successful, or null if not.
 * @throws {Error} If the database query fails.
 */
async function assignRoleToUser(userId, roleName) {
  const text = `
      WITH role_cte AS (
        SELECT id FROM role WHERE name = $1
      )
      INSERT INTO user_role (user_id, role_id)
      SELECT $2, id FROM role_cte
      RETURNING *;
    `;

  const values = [roleName, userId];

  try {
    const res = await db.query(text, values);
    if (res.rowCount === 0) {
      throw new Error("Role not found");
    }
    return res.rows[0];
  } catch (error) {
    console.error("Error assigning role to user:", error);
    throw new Error("Failed to assign role");
  }
}

/**
 * Retrieves volunteer details (total hours and tags) for a user by their ID.
 *
 * @async
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing volunteer details or null if not found.
 * @throws {Error} If the database query fails.
 */
async function getVolunteerDetailsById(id) {
  const text = `
      SELECT v.total_hours, v.tags
      FROM volunteer v
      WHERE v.user_id = $1;
    `;
  const res = await db.query(text, [id]);
  return res.rows[0];
}

/**
 * Retrieves organizer details (organization name and tags) for a user by their ID.
 *
 * @async
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing organizer details or null if not found.
 * @throws {Error} If the database query fails.
 */
async function getOrganizerDetailsById(id) {
  const text = `
      SELECT o.org_name, o.tags
      FROM organizer o
      WHERE o.user_id = $1;
    `;
  const res = await db.query(text, [id]);
  return res.rows[0];
}

/**
 * Creates a new volunteer record for a user.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} [totalHours=0] - The total hours the volunteer has contributed.
 * @param {Array<string>} [tags=[]] - Tags associated with the volunteer.
 * @returns {Promise<Object>} A promise that resolves to the newly created volunteer object.
 * @throws {Error} If the database query fails.
 */
async function createVolunteer(userId, totalHours = 0, tags = ["vol"]) {
  const text = `
      INSERT INTO volunteer (user_id, total_hours, tags)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  const values = [userId, totalHours, tags];
  const res = await db.query(text, values);
  return res.rows[0];
}

/**
 * Adds a tag to the tags array for a volunteer.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} tag - The tag to be added.
 * @returns {Promise<Object|null>} A promise that resolves to the updated volunteer object if successful, or null if not found.
 * @throws {Error} If the database query fails.
 */
async function addTagToVolunteer(userId, tag) {
  const text = `
      UPDATE volunteer
      SET tags = array_append(COALESCE(tags, '{}'), $2)
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
}

/**
 * Removes a tag from the tags array for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the volunteer.
 * @param {string} tag - The tag to be removed.
 * @returns {Promise<Object|null>} The updated volunteer object or null if not found.
 * @throws {Error} If the database query fails.
 */
async function removeTagFromVolunteer(userId, tag) {
  const text = `
        UPDATE volunteer
        SET tags = array_remove(tags, $2)
        WHERE user_id = $1
        RETURNING *;
      `;

  const values = [userId, tag];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error removing tag from organizer:", error);
    throw new Error("Failed to remove tag");
  }
}

/**
 * Increments the total hours for a volunteer.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} hours - The number of hours to add.
 * @returns {Promise<Object|null>} A promise that resolves to the updated volunteer object if successful, or null if the user is not found.
 * @throws {Error} If the database query fails.
 */
async function incrementTotalHours(userId, hours) {
  const text = `
      UPDATE volunteer
      SET total_hours = total_hours + $2
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
}

/**
 * Increments the given hours for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {number} hours - The number of hours to add.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
async function incrementGivenHours(userId, hours) {
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
}

/**
 * Updates the organization name for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {string} newOrgName - The new organization name.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
async function updateOrgName(userId, newOrgName) {
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
}

/**
 * Adds a tag to the tags array for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {string} tag - The tag to be added.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
async function addTagToOrganizer(userId, tag) {
  const text = `
      UPDATE organizer
      SET tags = array_append(COALESCE(tags, '{}'), $2)
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, tag];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error adding tag to organizer:", error);
    throw new Error("Failed to add tag");
  }
}

/**
 * Removes a tag from the tags array for an organizer.
 *
 * @async
 * @param {number} userId - The ID of the organizer.
 * @param {string} tag - The tag to be removed.
 * @returns {Promise<Object|null>} The updated organizer object or null if not found.
 * @throws {Error} If the database query fails.
 */
async function removeTagFromOrganizer(userId, tag) {
  const text = `
      UPDATE organizer
      SET tags = array_remove(tags, $2)
      WHERE user_id = $1
      RETURNING *;
    `;

  const values = [userId, tag];

  try {
    const res = await db.query(text, values);
    return res.rows[0] || null;
  } catch (error) {
    console.error("Error removing tag from organizer:", error);
    throw new Error("Failed to remove tag");
  }
}

/**
 * Creates a new organizer record for a user.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} orgName - The name of the organization.
 * @param {Array<string>} [tags=[]] - Tags associated with the organizer.
 * @returns {Promise<Object>} A promise that resolves to the newly created organizer object.
 * @throws {Error} If the database query fails.
 */
async function createOrganizer(userId, orgName, tags = ["org"]) {
  const text = `
      INSERT INTO organizer (user_id, org_name, tags)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  const values = [userId, orgName, tags];
  const res = await db.query(text, values);
  return res.rows[0];
}

// ! all the tests performed only verify that the query is valid and not the function it self.
// ? maybe add more detailed functions to get certain values form users
export {
  createUser, // tested
  getUserByLogin, // tested
  getUserById, // tested
  assignRoleToUser,
  createVolunteer, // tested
  createOrganizer, // tested
  getVolunteerDetailsById, // tested
  getOrganizerDetailsById, // tested
  addTagToOrganizer, // tested
  removeTagFromOrganizer, // tested
  updateOrgName, // tested
  incrementGivenHours, // tested
  incrementTotalHours, // tested
  addTagToVolunteer, // tested
  updateUser,
  removeTagFromVolunteer, // tested
};
