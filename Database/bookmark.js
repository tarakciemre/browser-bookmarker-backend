import db from "./database.js";

async function getUserBookmarks(userId) {
  try {
    const query = "SELECT * FROM bookmark WHERE userId = ?";
    const results = await db.execute(query, [userId]);
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

async function createBookmark(url, userId) {
  try {
    const query = "INSERT INTO bookmark (url, userId) VALUES (?, ?)";
    await db.execute(query, [url, userId]);
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw error;
  }
}

async function updateBookmark(bookmarkId, url, userId) {
  try {
    const query = "UPDATE bookmark SET url = ?, userId = ? WHERE id = ?";
    await db.execute(query, [url, userId, bookmarkId]);
  } catch (error) {
    console.error("Error updating bookmark:", error);
    throw error;
  }
}

export { getUserBookmarks, getBookmarkById, createBookmark, updateBookmark };
