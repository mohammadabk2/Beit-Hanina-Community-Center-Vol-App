// to interact with the database

const db = require("./db");

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
    INSERT INTO person (name, birth_date, sex, phone_number, email, address, insurance, id_number, username, password_hash)
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
      INSERT INTO user_role (user_id, role_id)
      VALUES ($1, (SELECT id FROM role WHERE name = $2))
      RETURNING *;
    `;
  const values = [userId, roleName];
  const res = await db.query(text, values);
  return res.rows[0];
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
async function createVolunteer(userId, totalHours = 0, tags = []) {
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
 * Creates a new organizer record for a user.
 *
 * @async
 * @param {number} userId - The ID of the user.
 * @param {string} orgName - The name of the organization.
 * @param {Array<string>} [tags=[]] - Tags associated with the organizer.
 * @returns {Promise<Object>} A promise that resolves to the newly created organizer object.
 * @throws {Error} If the database query fails.
 */
async function createOrganizer(userId, orgName, tags = []) {
  const text = `
      INSERT INTO organizer (user_id, org_name, tags)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  const values = [userId, orgName, tags];
  const res = await db.query(text, values);
  return res.rows[0];
}

module.exports = {
  getUserByLogin,
  createUser,
  getUserById,
  assignRoleToUser,
  getVolunteerDetailsById,
  getOrganizerDetailsById,
  createVolunteer,
  createOrganizer,
};
