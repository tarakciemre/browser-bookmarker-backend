// index.js
import express from "express";
import {
  getUserBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
} from "./Database/bookmark";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "./Database/user";
import {
  checkToken
} from "./Database/login"

const app = express();
app.use(express.json());
const PORT = 4000;

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const isValid = await checkToken(token);
  if (isValid) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

// BOOKMARK ROUTES

app.get("/bookmark/:id", verifyToken, async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const result = await getBookmarkById(bookmarkId);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching bookmark");
  }
});

app.post("/bookmark", verifyToken, async (req, res) => {
  try {
    const { url, userId } = req.body;
    await createBookmark(url, userId);
  } catch (error) {
    res.status(500).send("Error creating bookmark");
  }
});

app.put("/bookmark/:id", verifyToken, async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const { url, userId } = req.body;
    await updateBookmark(bookmarkId, url, userId);
  } catch (error) {
    res.status(500).send("Error updating bookmark");
  }
});

app.get("/bookmarks/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await getUserBookmarks(userId);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send("Error fetching entries");
  }
});

// USER ROUTES
app.post("/user", verifyToken, async (req, res) => {
  try {
    const { name, password } = req.body;
    await createUser(name, password);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.put("/user/:userId", verifyToken, async (req, res) => {
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

app.delete("/user/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Error deleting user");
  }
});

app.get("/users", verifyToken, async (req, res) => {
  try {
    const results = await getUsers();
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
});

app.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const results = await getUser(userId);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
});

// LOGIN ROUTES

app.get("/loginuserId", verifyToken, async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;
