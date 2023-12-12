// index.js
import express from "express";
import {
  getUserBookmarks,
  getBookmarkById,
  deleteBookmarkById,
  createBookmark,
  updateBookmark,
} from "./Database/bookmark.js";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "./Database/user.js";
import { checkToken, logIn, logOut } from "./Database/login.js";

const app = express();
app.use(express.json());
const PORT = 4000;

// TOKEN VERIFICATION

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const tokenParts = token.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      const actualToken = tokenParts[1];
      console.log(actualToken);
      const isValid = await checkToken(actualToken);
      if (isValid) {
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      // Handle invalid authorization header
      res.status(401).send("Invalid authorization header");
    }
  } else {
    // Handle missing authorization header
    res.status(401).send("Authorization header missing");
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

app.delete("/bookmark/:id", verifyToken, async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const result = await deleteBookmarkById(bookmarkId);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching bookmark");
  }
});

app.post("/bookmark", verifyToken, async (req, res) => {
  try {
    const { url, username } = req.body;
    await createBookmark(url, username);
    res.status(200).send("Successfully created bookmark");
  } catch (error) {
    res.status(500).send("Error creating bookmark");
  }
});

app.put("/bookmark/:id", verifyToken, async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const { url, username } = req.body;
    await updateBookmark(bookmarkId, url, username);
    res.status(200).send("Successfully updated bookmark");
  } catch (error) {
    res.status(500).send("Error updating bookmark");
  }
});

app.get("/bookmarks/:username", verifyToken, async (req, res) => {
  try {
    const username = req.params.username;
    const results = await getUserBookmarks(username);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send("Error fetching entries");
  }
});

// USER ROUTES
app.post("/user", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    await createUser(name, username, password);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

app.put("/user/:username", verifyToken, async (req, res) => {
  try {
    const username = req.params.username;
    const { name, password } = req.body;
    await updateUser(username, name, password);
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
});

app.delete("/user/:username", verifyToken, async (req, res) => {
  try {
    const username = req.params.username;
    await deleteUser(username);
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
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
});

app.get("/user/:username", verifyToken, async (req, res) => {
  try {
    const username = req.params.username;
    const results = await getUser(username);
    res.status(200).json(results.rows);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Error getting users");
  }
});

// LOGIN ROUTES

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await logIn(username, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
});

app.post("/logout", verifyToken, async (req, res) => {
  try {
    const token = req.headers.authorization; // Assuming token is sent in the Authorization header
    await logOut(token);
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Error during logout");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
export default app;
