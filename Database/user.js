import db from "./database";

async function createUser(name, password) {
  try {
    const query = "INSERT INTO user (name, password) VALUES (?, ?)";
    await db.execute(query, [name, hashedPassword]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUser(userId, name, password) {
  try {
    const query = "UPDATE user SET name = ?, password = ? WHERE id = ?";
    await db.execute(query, [name, password, userId]);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const query = "DELETE FROM user WHERE id = ?";
    await db.execute(query, [userId]);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function getUser(userId) {
  try {
    const query = "SELECT id, name FROM user WHERE id = ?";
    const results = await db.execute(query, [userId]);
    return results;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
}

async function getUsers() {
  try {
    const query = "SELECT id, name FROM user";
    const results = await db.execute(query);
    return results;
  } catch (error) {
    console.error("Error getting al users:", error);
    throw error;
  }
}

export { createUser, updateUser, deleteUser, getUser, getUsers };
