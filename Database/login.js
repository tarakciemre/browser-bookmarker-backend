import db from "./database.js";
import { encrypt, checkLogin } from "../Utils/encryption.js";

async function logIn(username, password) {
  try {
    const userQuery = "SELECT username, password FROM user WHERE username = ?";
    const userResults = await db.execute(userQuery, [username]);
    const passwordIsValid = await checkLogin(
      password,
      userResults.rows[0].password
    );
    if (userResults.rows.length === 0 || !passwordIsValid) {
      throw new Error(userResults.rows);
    }

    // create a login token
    const token = uuidv4();
    const tokenQuery =
      "INSERT INTO loggedInUsers (token, username) VALUES (?, ?)";
    await db.execute(tokenQuery, [token, username]);

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function logOut(token) {
  try {
    // create a login token
    const tokenQuery = "DELETE FROM loggedInUsers WHERE token = ?";
    const result = await db.execute(tokenQuery, [token]);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function checkToken(token) {
  try {
    const query = "SELECT * FROM loggedInUsers WHERE token = ?";
    const result = await db.execute(query, [token]);

    return result.rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { logIn, logOut, checkToken };
