// index.js

import { connect } from "@planetscale/database";
import express from "express";

const app = express();
app.use(express.json());
const PORT = 4000;

app.get("/bookmark/:id", async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const result = await getBookmarkById(bookmarkId);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching bookmark");
  }
});

app.post("/bookmark", async (req, res) => {
  try {
    const { url, userId } = req.body;
    await createBookmark(url, userId);
  } catch (error) {
    res.status(500).send("Error creating bookmark");
  }
});

app.put("/bookmark/:id", async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const { url, userId } = req.body;
    await updateBookmark(bookmarkId, url, userId);
  } catch (error) {
    res.status(500).send("Error updating bookmark");
  }
});

app.get("/bookmarks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await getUserBookmarks(userId);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send("Error fetching entries");
  }
});

app.post("/user", async (req, res) => {
  try {
    const { name, password } = req.body;
    await createUser(name, password);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.put("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, password } = req.body;
    await updateUser(userId, name, password);
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
});

app.delete("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

app.get("/users", async (req, res) => {
  try {
    const results = await getUsers();
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

async function createUser(name, password) {
  try {
    const query = "INSERT INTO user (name, password) VALUES (?, ?)";
    await connection.execute(query, [name, password]);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUser(userId, name, password) {
  try {
    const query = "UPDATE user SET name = ?, password = ? WHERE id = ?";
    await connection.execute(query, [name, password, userId]);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const query = "DELETE FROM user WHERE id = ?";
    await connection.execute(query, [userId]);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function getUsers() {
  try {
    const query = "SELECT * FROM user";
    await connection.execute(query);
  } catch (error) {
    console.error("Error getting al users:", error);
    throw error;
  }
}

// Function to insert an entry
async function getEntries() {
  var result;
  try {
    const query = "SELECT * FROM test_table";
    result = await connection.execute(query);
  } catch (error) {
    result = null;
  }
  return result;
}

// Function to get entries for a specific user
async function getUserBookmarks(userId) {
  try {
    const query = "SELECT * FROM bookmark WHERE userId = ?";
    const results = await connection.execute(query, [userId]);
    return results;
  } catch (error) {
    return null;
  }
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Create the connection
const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

async function getBookmarkById(bookmarkId) {
  try {
    const query = "SELECT * FROM bookmark WHERE id = ?";
    const results = await connection.execute(query, [bookmarkId]);
    return results;
  } catch (error) {
    console.error("Error selecting bookmark:", error);
    return null;
  }
}

async function createBookmark(url, userId) {
  try {
    const query = "INSERT INTO bookmark (url, userId) VALUES (?, ?)";
    await connection.execute(query, [url, userId]);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw error;
  }
}

async function updateBookmark(bookmarkId, url, userId) {
  try {
    const query = "UPDATE bookmark SET url = ?, userId = ? WHERE id = ?";
    await connection.execute(query, [url, userId, bookmarkId]);
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw error;
  }
}

// Function to insert an entry
async function insertEntry() {
  try {
    const query = "INSERT INTO test_table (name) VALUES (?)";
    await connection.execute(query, ["Test Name"]);
    console.log("Entry inserted successfully");
  } catch (error) {
    console.error("Error inserting entry:", error);
  }
}

// Export the Express API
export default app;
