import { db } from "./database";
import { encrypt, checkLogin } from "../Utils/encryption";

async function logIn(username, password) {
  try {
    const userQuery = "SELECT username, password FROM user WHERE username = ?";
    const userResults = await db.execute(userQuery, [username]);
    if (
      userResults.rows.length === 0 ||
      !checkLogin(password, userResults.rows[0].password)
    ) {
      throw new Error("Invalid username or password");
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
