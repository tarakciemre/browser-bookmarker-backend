import db from "./database.js";
import { encrypt } from "../Utils/encryption.js";

async function createUser(username, password) {
  try {
    const query = "INSERT INTO user (name, password) VALUES (?, ?)";
    const hashedPassword = encrypt(password);
    await db.execute(query, [username, hashedPassword]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUser(username, password) {
  try {
    const query = "UPDATE user SET password = ? WHERE name = ?";
    const hashedPassword = encrypt(password);
    await db.execute(query, [username, hashedPassword]);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(username) {
  try {
    const query = "DELETE FROM user WHERE username = ?";
    await db.execute(query, [username]);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function getUser(username) {
  try {
    const query = "SELECT username FROM user WHERE username = ?";
    const results = await db.execute(query, [username]);
    return results;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
}

async function getUsers() {
  try {
    const query = "SELECT username FROM user";
    const results = await db.execute(query);
    return results;
  } catch (error) {
    console.error("Error getting al users:", error);
    throw error;
  }
}

export { createUser, updateUser, deleteUser, getUser, getUsers };
