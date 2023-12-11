// index.js

import { connect } from "@planetscale/database";
import express from "express";

const app = express();
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
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error fetching entries");
  }
});

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
