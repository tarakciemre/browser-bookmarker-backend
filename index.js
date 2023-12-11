// index.js

import { connect } from "@planetscale/database";
import express from "express";

const app = express();
const PORT = 4000;

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.get("/insert", (req, res) => {
  insertEntry();
  res.status(200).json("Welcome, your app is working well");
});

app.get("/get", (req, res) => {
  var results = getEntries();
  res.status(200).send(results);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Create the connection
const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// Function to create a table
async function createTable() {
  try {
    const query = `
			CREATE TABLE IF NOT EXISTS test_table (
					id INT AUTO_INCREMENT PRIMARY KEY,
					name VARCHAR(255) NOT NULL
					)
			`;
    await connection.execute(query);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
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

// Function to insert an entry
async function getEntries() {
  var result;
  try {
    const query = "SELECT * FROM test_table";
    result = await connection.execute(query);
    console.log("Entry selected");
  } catch (error) {
    result = null;
    console.error("Error selecting entry:", error);
  }
  return result;
}

// Initialize table and insert an entry
async function initializeAndTestDatabase() {
  await createTable();
}

initializeAndTestDatabase();

// Export the Express API
export default app;
