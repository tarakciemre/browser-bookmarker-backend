import db from "./database.js";

async function getUserBookmarks(username) {
  try {
    const query = "SELECT * FROM bookmark WHERE username = ?";
    const results = await db.execute(query, [username]);
    return results;
  } catch (error) {
    return null;
  }
}

async function getBookmarkById(bookmarkId) {
  try {
    const query = "SELECT * FROM bookmark WHERE id = ?";
    const results = await db.execute(query, [bookmarkId]);
    return results;
  } catch (error) {
    console.error("Error selecting bookmark:", error);
    return null;
  }
}

async function deleteBookmarkById(bookmarkId) {
  try {
    const query = "DELETE FROM bookmark WHERE id = ?";
    const results = await db.execute(query, [bookmarkId]);
    return results;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return null;
  }
}

async function createBookmark(url, username) {
  try {
    const query = "INSERT INTO bookmark (url, username) VALUES (?, ?)";
    await db.execute(query, [url, username]);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw error;
  }
}

async function updateBookmark(bookmarkId, url, username) {
  try {
    const query = "UPDATE bookmark SET url = ?, username = ? WHERE id = ?";
    await db.execute(query, [url, username, bookmarkId]);
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw error;
  }
}

export {
  deleteBookmarkById,
  getUserBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
};
